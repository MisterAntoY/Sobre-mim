# Segurança — IM Portfolio

Categorias de risco de segurança mapeadas à arquitetura específica do IM Portfolio, com prevenção atual e como testar.

**Versão:** 1.0  
**Última atualização:** 2026-06-27  
**Referência cruzada:** `@doctork.md` (auditoria consolidada), `docs/SECURITY-AUDIT.md` (achados catalogados)

---

## 1. XSS (Cross-Site Scripting)

**Por quê é risco:**  
Usuários conseguem injetar `<script>`, `onerror=`, ou payloads JavaScript em campos de texto. Se futuro houver back-end que armazene esses dados e serve sem escape, atacante consegue executar código.

**Risco específico do IM Portfolio:**  
- ContactForm aceita texto livre (campo "Mensagem")
- Futuro: se houver back-end com admin dashboard, dados poderiam ser renderizados sem escape

**Como testa:**  
1. Abrir `http://localhost:5173/#contacto`
2. No campo "Mensagem", colar: `<img src=x onerror="console.log('XSS')">`
3. Abrir DevTools → Console
4. Esperado: Nenhum `console.log` deve aparecer. Mensagem deve ser renderizada como string literal.

**Prevenção atual:**
- ✅ React escapa strings automaticamente (JSX)
- ✅ Sem uso de `dangerouslySetInnerHTML` ou `innerHTML`
- ✅ CSP `script-src 'self'` apenas

**Arquivo relevante:**  
`src/components/ContactForm.tsx` (renderização de campos)

**Status:** ✅ Seguro

---

## 2. CSRF (Cross-Site Request Forgery)

**Por quê é risco:**  
Se houver formulário que altere estado crítico (criar conta, mudar permissões, etc.), atacante consegue forçar submissão usando `<img src="...">` ou `fetch()` automático.

**Risco específico do IM Portfolio:**  
- ContactForm **não tem submissão HTTP real** — abre `mailto:` direto
- Nenhuma ação state-changing (site é estático, read-only)

**Como testa:**  
N/A — não há endpoints sensíveis a proteger.

**Prevenção atual:**
- ✅ Formulário abre email client, sem submissão HTTP
- ✅ Sem cookies críticos
- ✅ Sem estado mutável no servidor

**Status:** ✅ Seguro (não aplicável)

---

## 3. Validação e Sanitização de Input

**Por quê é risco:**  
- Payloads maliciosos (muito longos, contendo caracteres de controle) podem:
  - Quebrar formulários
  - Ser armazenados em back-end futuro
  - Explorar limite de banco de dados
- Honeypot inefetivo permite bots preencher

**Risco específico do IM Portfolio:**  
- Formulário aceita entrada de usuário sem validação server-side
- Cliente pode contornar JavaScript + DevTools

**Como testa:**  

**Teste 1: Max Length Bypass**
1. Abrir DevTools → Console
2. Colar: `document.querySelector('[name="message"]').maxLength = 99999; // fake bypass`
3. Tentar colar 10MB de texto
4. Esperado: Ainda deve ser rejeitado pelo componente React (state management)

**Teste 2: Honeypot Escape**
1. Abrir DevTools → Elements
2. Procurar `<input name="website">`
3. Verificar: atributos `tabIndex={-1}`, `display: none`, `aria-hidden="true"`
4. Remover `display: none` manualmente
5. Esperado: Preenchendo o campo `.website` deve rejeitar submissão

**Teste 3: Controle Characters**
1. Abrir DevTools → Console
2. Colar: `String.fromCharCode(0, 7, 8, 26)` (caracteres NULL, BEL, BS, SUB)
3. Copiar resultado e colar em campo
4. Esperado: Sanitização deve remover esses caracteres

**Prevenção atual:**
- ✅ Função `sanitize()` remove caracteres de controle (`\x00-\x1F`, `\x7F`)
- ✅ `MAX_NAME: 80`, `MAX_SUBJECT: 120`, `MAX_MESSAGE: 2000`
- ✅ Email validado com regex: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`
- ✅ Honeypot com `tabIndex={-1}` e `display: none`

**Arquivo relevante:**  
`src/components/ContactForm.tsx:9-18` (sanitização + validação)

**Status:** ✅ Mitigado

---

## 4. Rate Limiting e Anti-Bot

**Por quê é risco:**  
Sem limite de submissões, atacante consegue:
- Spammar formulário 1000x em segundos (futuro back-end fica sobrecarregado)
- Fazer brute-force em campos (se houver login futuro)
- Ataques DDoS client-side

**Risco específico do IM Portfolio:**  
- Rate-limit é **apenas client-side**, via `localStorage`
- Usuário pode: `localStorage.clear()` ou manipular timestamp

**Como testa:**  

**Teste 1: Contornar Rate-Limit**
1. Preencher formulário com dados válidos
2. Clicar "Preparar email" (deve abrir mailto)
3. Imediatamente (no console): `localStorage.removeItem('contact:lastSubmit')`
4. Tentar re-submeter **sem esperar 30s**
5. Esperado: Deve mostrar erro "Aguarda Xs antes de enviar novo pedido"
6. Falha: Se permitir submissão imediata, rate-limit é contornável

**Teste 2: Anti-Bot via Tempo de Mount**
1. Abrir DevTools → Console
2. Imprimir: `Date.now()` para ver hora atual
3. Notar que `mountTime` em `ContactForm` é definido no mount
4. Tentar submeter em <1.5s do carregamento (tecnicamente impossível pelo browser, mas se manipular manualmente)
5. Esperado: Deve rejeitar com "Demasiado rápido — preenche o formulário com calma"

**Prevenção atual:**
- ✅ `SUBMIT_COOLDOWN_MS: 30000` (30 segundos)
- ✅ `localStorage.getItem('contact:lastSubmit')` para rastreamento
- ✅ Anti-bot: rejeita se forma preenchida em <1.5s
- ✅ Honeypot: bots preenchem campo `.website`, rejeitados

**Arquivo relevante:**  
`src/components/ContactForm.tsx:43-73` (rate-limit logic)

**Status:** ✅ Mitigado (cliente pode contornar, mas serve contra bots + usuários descuidados)

---

## 5. Exposição de Dados Sensíveis

**Por quê é risco:**  
- Secrets (API keys, tokens) no código são expostos a qualquer pessoa
- Emails/telefones expostos pode levar spam ou engenharia social
- Dados PII (Personally Identifiable Information) em bundle

**Risco específico do IM Portfolio:**  
- Email + telefone + links de redes sociais **estão no código** (é propositalmente um portfolio de contacto)
- Nenhum secret/token encontrado (site estático, sem back-end)

**Como testa:**  

**Teste 1: Bundle Scanning**
```bash
npm run build
# Verificar dist/assets/*.js
strings dist/assets/*.js | grep -E "@gmail|whatsapp|t.me|github.com"
```
Esperado: Encontrar emails/links (intencional), mas NÃO encontrar `API_KEY`, `SECRET`, `MONGODB_URI`, etc.

**Teste 2: DevTools Inspection**
1. Abrir DevTools → Application → Local Storage
2. Verificar se há dados sensíveis armazenados
3. Esperado: Apenas `contact:lastSubmit` (timestamp, não sensível)

**Prevenção atual:**
- ✅ Nenhuma `.env` com secrets
- ✅ Nenhum token hardcoded
- ✅ Email/telefone são **intencionalmente públicos** (portfolio)
- ✅ `localStorage` apenas armazena timestamp de rate-limit

**Arquivo relevante:**  
`src/components/Contact.tsx:19-68` (socials públicos — OK)

**Status:** ✅ Seguro (dados públicos são intencionais)

---

## 6. Service Worker / PWA Security

**Por quê é risco:**  
- Service worker com cache inseguro poderia servir dados antigos ou maliciosos offline
- Atualizações de versão poderiam não ser aplicadas
- Cache sem versionamento = dados stale forever

**Risco específico do IM Portfolio:**  
- SW faz cache-first: pode servir versão antigo do site offline
- Se SW não for atualizado, usuário fica com versão velha

**Como testa:**  

**Teste 1: Offline Functionality**
1. `npm run build`
2. Abrir dev server (ou servir `dist/`)
3. Abrir DevTools → Application → Service Workers
4. Marcar "Offline"
5. Recarregar página
6. Esperado: Deve servir versão em cache (OK — PWA feature)
7. Mudar algo no código + rebuild + redeploy
8. Esperado: Usuário deve receber notificação de atualização (se SW fizer hard refresh)

**Teste 2: Cache-Only Endpoints**
```bash
# Verificar public/sw.js
grep -A5 "caches.match(req)" public/sw.js
```
Esperado: Apenas `GET` é cacheado, não POST/PUT/DELETE

**Teste 3: Same-Origin Validation**
```javascript
// Em sw.js, verificar:
if (url.origin !== self.location.origin) return  // Deve estar presente
```
Esperado: SW não cacheia recursos cross-origin

**Prevenção atual:**
- ✅ SW apenas cacheia `GET`
- ✅ Same-origin only: `url.origin !== self.location.origin` check
- ✅ Versionamento: `VERSION = 'im-portfolio-v1'`
- ✅ Cleanup de caches antigos no `activate`
- ✅ Fallback seguro a `/index.html`

**Arquivo relevante:**  
`public/sw.js:1-50` (lógica de cache)

**Status:** ✅ Seguro

---

## 7. Headers e Configuração de Segurança

**Por quê é risco:**  
- Falta de `X-Frame-Options` permite clickjacking (site embutido em iframe malicioso)
- Falta de CSP permite injeção de scripts de terceiros
- MIME sniffing pode fazer browser executar `.js` como `.html`

**Risco específico do IM Portfolio:**  
Nenhum risco atual (headers bem configurados).

**Como testa:**  

**Teste 1: CSP Evaluation**
```bash
curl -I http://localhost:5173
# Ou via Vite preview server
npm run preview  # Aplica headers de vite.config.ts
```
Esperado: Headers:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
```

**Teste 2: CSP Violation Logging**
1. Abrir DevTools → Console
2. Tentar injetar: `<script src="https://attacker.com/evil.js"></script>`
3. Esperado: CSP deve bloquear, log de violação em console

**Prevenção atual:**
- ✅ CSP em `index.html`: `default-src 'self'`, `script-src 'self' 'unsafe-inline'`
- ✅ `X-Frame-Options: DENY` (no iframe embedding)
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Permissions-Policy` desativa câmera, microfone, geolocalização
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`

**Arquivo relevante:**  
`index.html:10` (meta tags CSP)  
`vite.config.ts:20-31` (server headers)

**Status:** ✅ Seguro

---

## 8. LGPD e Conformidade de Privacidade

**Por quê é risco:**  
Coletar dados pessoais sem consentimento, armazenar indefinidamente, ou expor é violação de LGPD.

**Risco específico do IM Portfolio:**  
- Formulário coleta nome + email + mensagem
- Não há armazenamento (abre `mailto:` direto)
- Nenhum tracking (Google Analytics, etc.)

**Como testa:**  

**Teste 1: Verificar Armazenamento**
```bash
grep -r "localStorage\|sessionStorage\|sendBeacon\|fetch.*api" src/components/ContactForm.tsx
```
Esperado: Nenhuma submissão HTTP real. Apenas `mailto:` abre.

**Teste 2: Verificar Tracking**
```bash
grep -r "gtag\|analytics\|hotjar\|mixpanel\|segment" src/
npm list | grep analytics
```
Esperado: Nenhum tracker encontrado.

**Prevenção atual:**
- ✅ Dados de visitantes NÃO são armazenados
- ✅ Formulário abre `mailto:` — sem servidor a receber dados
- ✅ Nenhum Google Analytics, Hotjar, ou similares
- ✅ Email/telefone do autor são públicos (portfolio de contacto)

**Arquivo relevante:**  
`src/components/ContactForm.tsx:97-119` (abertura de mailto, não submissão)

**Status:** ✅ Conforme (dados não coletados + nenhum tracking)

---

## Resumo por Severidade

| Categoria | Severidade | Status | Mitigação |
|-----------|-----------|--------|-----------|
| XSS | Média | ✅ Seguro | React + CSP |
| CSRF | N/A | ✅ Seguro | Sem submissão HTTP |
| Validação | Média | ✅ Mitigado | Sanitização + max-length |
| Rate-Limit | Baixa | ✅ Mitigado | 30s cooldown + anti-bot |
| Dados Sensíveis | N/A | ✅ Seguro | Nenhum secret exposto |
| Service Worker | Baixa | ✅ Seguro | Cache seguro + same-origin |
| Headers/CSP | N/A | ✅ Seguro | Headers fortes configurados |
| LGPD | N/A | ✅ Conforme | Sem coleta/armazenamento |

---

## Como Reutilizar Este Documento

Ao fazer auditoria de segurança **futura**, use este documento como:

1. **Checklist:** Verificar cada categoria acima
2. **Referência cruzada:** Links para `docs/SECURITY-AUDIT.md` (achados anteriores)
3. **Templates de prompts:** Ver `SECURITY-PROMPTS.md` para templates já estruturados
4. **Testes:** Ver `docs/SECURITY-TESTING.md` para por quê de cada teste

---

**Próxima revisão:** TBD (ver `docs/SECURITY-AUDIT.md` para histórico)
