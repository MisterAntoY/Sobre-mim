# Por Quê de Cada Teste — IM Portfolio

Explicação de por quê cada categoria de segurança importa, risco específico ao projeto, e como testar.

**Referência:** `docs/SECURITY.md` (categorias), `SECURITY-PENTEST.md` (testes prontos)

---

## 1. Injeção em ContactForm (XSS)

**Por quê importa:**  
Usuários conseguem injetar `<script>`, `onerror=`, ou payloads JavaScript. Se futuro houver back-end que armazena dados sem escape, script roda quando admin visualiza.

**Risco específico do IM Portfolio:**  
- ContactForm aceita mensagem livre (2000 chars)
- React escapa automaticamente (hoje — seguro)
- Futuro: se houver admin dashboard server-side com dados renderizados sem escape, isso se torna crítico

**Impacto se explorado:**  
- Hoje: Nenhum (React escapa)
- Futuro com back-end: Session hijacking, credential theft, malware injection

**Como testar:**

**Passo 1: Teste de Escape**
```
1. Abrir http://localhost:5173/#contacto
2. Preencher:
   - Nome: "Test User"
   - Email: "test@example.com"
   - Mensagem: <img src=x onerror="alert('XSS')">
3. Abrir DevTools → Console
4. Clicar "Preparar email"
5. ESPERADO: Alert NÃO aparece. String deve aparecer como literal.
6. FALHA: Se alert aparecer, há XSS.
```

**Passo 2: Verificar Escape em Bundle**
```bash
npm run build
npm run preview
# Abrir DevTools → Network
# Procurar arquivo com "onerror" literal (deve estar escapado)
strings dist/assets/*.js | grep -i onerror
# ESPERADO: Nenhuma menção a onerror (ou está escapada)
```

**Mitigação em código:**
- ✅ `src/components/ContactForm.tsx`: Renderiza `{message}` no JSX (React escapa)
- ✅ Sem `dangerouslySetInnerHTML`
- ✅ CSP `script-src 'self' 'unsafe-inline'` bloqueia scripts inline injected

---

## 2. Rate-Limiting Bypass

**Por quê importa:**  
Sem limite, usuários/bots conseguem:
- Submeter 1000x em 1 segundo (futuro back-end fica sobrecarregado)
- Fazer brute-force em login (se houver)
- Ataques DDoS client-side

**Risco específico do IM Portfolio:**  
- Rate-limit é **100% client-side** via `localStorage`
- `localStorage` pode ser limpo com `localStorage.clear()`
- Usuário malicioso consegue contornar, mas **bots não conseguem** (honeypot + anti-bot catch)

**Impacto se explorado:**  
- Usuário: consegue spammar formulário (abre email client 100x — chato, não crítico)
- Bot: honeypot / <1.5s guard rejeita
- Futuro back-end: sem rate-limit servidor-side, spam poderia lotar inbox

**Como testar:**

**Teste 1: Contornar localStorage**
```
1. Preencher formulário com dados válidos
2. Clicar "Preparar email" (deve abrir mailto)
3. IMEDIATAMENTE, abrir DevTools → Console
4. Rodar: localStorage.removeItem('contact:lastSubmit')
5. Tentar re-submeter **sem esperar 30s**
6. ESPERADO: Erro "Aguarda Xs antes de enviar novo pedido"
7. FALHA: Se permitir submissão sem erro, rate-limit falhou
```

**Teste 2: Anti-Bot via Tempo de Mount**
```javascript
// Em DevTools → Console, ao carregar página:
// Inspecionar: const mountTime = useRef(Date.now())
// Preencher form em <1.5s (quase impossível manualmente, mas teórico):

// Se manipular manualmente (não realista):
// document.querySelector('[type="submit"]').click() rapidamente
// ESPERADO: Erro "Demasiado rápido"
```

**Teste 3: Honeypot Effectiveness**
```
1. Abrir DevTools → Network tab
2. Inspecionar XHR/Fetch (haverá nenhum — mailto abre direto)
3. Abrir DevTools → Elements
4. Procurar <input name="website" ... />
5. Verificar: tabIndex={-1}, display: none
6. Se honeypot estiver visível, remover display:none
7. Preencher campo .website e submeter
8. ESPERADO: Rejeição (honeypot detecta)
9. FALHA: Se formulário aceitar, honeypot inefetivo
```

**Mitigação em código:**
- ✅ `SUBMIT_COOLDOWN_MS = 30000`
- ✅ Anti-bot: <1.5s rejeita
- ✅ Honeypot: `.website` field hidden

---

## 3. Honeypot Inefetivo

**Por quê importa:**  
Bots básicos preenchem **todos** os campos de formulário. Se honeypot não estiver realmente escondido, bots conseguem passar.

**Risco específico do IM Portfolio:**  
- Honeypot é único controle anti-bot (além <1.5s)
- Se estiver visível, bots conseguem evitá-lo

**Impacto se explorado:**  
- Bot consegue submeter (abre `mailto:` para endpoint público — usuário vê email)
- Spam de emails do author

**Como testar:**

**Teste 1: Verificar Visibilidade**
```
1. Abrir DevTools → Elements
2. Procurar: <input ... name="website" ... />
3. Verificar CSS:
   - tabIndex={-1} (não é focusável com Tab)
   - display: none (fora do visual)
   - aria-hidden="true" (acessibilidade)
4. ESPERADO: Todos presentes
5. FALHA: Se falta algum, bot consegue ver/preencher
```

**Teste 2: Honeypot Rejection Logic**
```javascript
// Em ContactForm.tsx, verificar:
if (website.trim() !== '') {
  setSent(true)  // Fingerprint — parece que funciona, mas rejeitado silenciosamente
  return
}
// ESPERADO: Se honeypot preenchido, forma aceita silenciosamente (sem erro)
// Isso engana bots que esperam resposta de erro
```

**Teste 3: Bot Emulation**
```
1. Escrever bot simples que:
   - Faz POST/GET ao formulário
   - Preenche TODOS os campos
   - Inclui field.website = "http://attacker.com"
2. Correr contra site
3. ESPERADO: Rejeição silenciosa (forma silently accepted mas rejeitada)
4. FALHA: Se bot consegue abusar, honeypot falhou
```

**Mitigação em código:**
- ✅ Campo `.website` com `tabIndex={-1}`, `display: none`
- ✅ Silently rejeita se preenchido (não mostra erro, confunde bots)
- ✅ Combinado com anti-bot <1.5s e rate-limit

---

## 4. Sanitização de Input Inefetiva

**Por quê importa:**  
Payloads maliciosos podem:
- Quebrar banco de dados futuro (caracteres NULL)
- Injetar código se houver template injection
- Consumir espaço de storage com payloads gigantes

**Risco específico do IM Portfolio:**  
- Cliente pode contornar `maxLength` via DevTools
- Caracteres de controle poderiam poluir dados futuro

**Impacto se explorado:**  
- Hoje: Nenhum (dados vão direto pra email)
- Futuro back-end: Injeção de caracters especiais, estouro de buffer

**Como testar:**

**Teste 1: Max-Length Bypass**
```javascript
// DevTools → Console:
document.querySelector('[name="message"]').maxLength = 999999
// Colar 10MB de lixo
// ESPERADO: Componente React deve rejeitar (state capped at 2000)
// FALHA: Se aceita tudo, max-length é apenas cosmético
```

**Teste 2: Controle Characters**
```javascript
// Construir payload com caracteres de controle:
const payload = String.fromCharCode(0, 7, 8, 26, 31)  // NULL, BEL, BS, SUB, US
// Colar em campo "Mensagem"
// ESPERADO: Sanitização remove esses chars
// FALHA: Se aparecem no bundle ou mailto, sanitização falhou
```

**Teste 3: Newline Injection**
```
1. Campo "Mensagem": escrever:
   Line 1
   
   
   Line 4
2. Preencher outros campos
3. Abrir mailto (verá a mensagem)
4. ESPERADO: Newlines normalizados (max 1 seguido)
5. FALHA: Se newlines múltiplos, pode quebrar headers de email
```

**Mitigação em código:**
- ✅ Função `sanitize()` em `ContactForm.tsx:9`
- ✅ Remove chars `\x00-\x1F`, `\x7F` (controle)
- ✅ Normaliza `\r\n` → `\n`
- ✅ Max-lengths: name(80), subject(120), message(2000)

---

## 5. Validação de Email Inefetiva

**Por quê importa:**  
Se email não for validado, `mailto:` pode quebrar ou ser explorado.

**Risco específico do IM Portfolio:**  
- Regex simples pode não capturar todos os emails válidos
- Ou aceitar emails inválidos

**Impacto se explorado:**  
- Email inválido → `mailto:` não abre correctamente
- Futuro back-end: entradas inválidas na BD

**Como testar:**

**Teste 1: Valid Emails**
```javascript
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254

// Válidos:
test@example.com        // ✅
user+tag@domain.co.uk   // ✅
name_123@test.org       // ✅

// Inválidos:
test@                   // ❌
@example.com            // ❌
test@.com               // ❌
test @example.com       // ❌ (espaço)
```

**Teste 2: Boundary Cases**
```
1. Email com 254 chars (max SMTP): aceita
2. Email com 255 chars: rejeita
3. Email com + (plus addressing): aceita
4. Email internacional (IDN): pode falhar — OK (SMTP legacy)
```

**Mitigação em código:**
- ✅ Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`
- ✅ Max 254 chars (SMTP limit)
- ✅ Simples mas adequado para portfolio (não precisa RFC 5321 completo)

---

## 6. Service Worker / PWA Insecurity

**Por quê importa:**  
SW com cache inseguro pode servir dados antigos, stale, ou injetar malware offline.

**Risco específico do IM Portfolio:**  
- SW cacheia tudo (CSS, JS, HTML)
- Se versão velha for cacheada, usuário fica desatualizado
- Se outro domínio injetar no cache, SW serve malware

**Impacto se explorado:**  
- Usuário offline vê versão velha (chato, não crítico)
- Futuro: se cache for contaminado, malware persist

**Como testar:**

**Teste 1: Offline Functionality**
```
1. npm run build
2. npm run preview (ou servir dist/)
3. DevTools → Application → Service Workers
4. Marcar "Offline"
5. Recarregar página
6. ESPERADO: Site funciona offline (PWA feature)
7. Verificar versão: deve ser o que está em cache
```

**Teste 2: Cache Invalidation**
```
1. Editar um arquivo (ex: alterar cor no CSS)
2. npm run build
3. Mudar VERSION em public/sw.js: 'im-portfolio-v1' → 'im-portfolio-v2'
4. npm run preview
5. Abrir site
6. Verificar: DevTools → Application → Cache Storage
7. ESPERADO: Cache antigo 'im-portfolio-v1' foi removido
8. FALHA: Se cache antigo persiste, SW não faz cleanup
```

**Teste 3: Same-Origin Validation**
```javascript
// Em public/sw.js, verificar:
const url = new URL(req.url)
if (url.origin !== self.location.origin) return

// ESPERADO: Requests para https://attacker.com não são cacheadas
// FALHA: Se SW cacheia cross-origin, malware pode injetar
```

**Mitigação em código:**
- ✅ SW apenas cacheia `GET` (não POST/PUT/DELETE)
- ✅ Same-origin only: `url.origin !== self.location.origin` check
- ✅ Versionamento: `VERSION = 'im-portfolio-v1'`
- ✅ Cleanup: `caches.keys()` → remove antigos em `activate`

---

## Checklist de Testes Recomendados

Ao fazer futura auditoria, rodar:

- [ ] Teste XSS: injetar payload em cada campo
- [ ] Teste Rate-Limit: `localStorage.clear()` e re-submeter
- [ ] Teste Honeypot: remover `display:none` e submeter
- [ ] Teste Max-Length: DevTools `maxLength = 999999`
- [ ] Teste Email: enviar emails inválidos
- [ ] Teste PWA: marcar offline e recarregar
- [ ] Teste Headers: `curl -I http://localhost:5173`
- [ ] Teste Sanitização: injetar caracteres NULL, BEL, etc.

---

**Próxima revisão:** Ver `docs/SECURITY-AUDIT.md` para histórico de testes passados
