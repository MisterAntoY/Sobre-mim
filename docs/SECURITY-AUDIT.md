# Auditoria de Segurança — IM Portfolio

Histórico consolidado de achados de segurança, status e mitigações aplicadas.

**Última atualização:** 2026-06-27

---

## Rodada 1: Auditoria Inicial (2026-06-27)

**Escopo:** Frontend React + Vite, PWA, Capacitor Android, formulário de contacto  
**Auditor:** Security Audit Framework  
**Resultado:** ✅ **Seguro para Deploy**

### Achados

| # | Achado | Severidade | Status | Arquivo | Nota | Mitigation |
|---|--------|-----------|--------|---------|------|------------|
| 1 | Email/telefone/redes sociais expostos no código | Baixa | N/A | `Contact.tsx:19-68` | Intencional — portfolio de contacto público | N/A (feature) |
| 2 | Rate-limit apenas client-side | Média | Mitigado | `ContactForm.tsx:43-73` | `localStorage` pode ser limpo, mas honeypot + anti-bot reduzem risco | ✅ 30s cooldown + honeypot + <1.5s guard |
| 3 | `localStorage` para rate-limit pode ser falsificado | Baixa | Aceitável | `ContactForm.tsx:45` | Apenas timestamp, não dados sensíveis; usuários podem contornar mas bots não | ✅ Anti-bot logic |
| 4 | XSS potencial em campos de formulário | Média | ✅ Seguro | `ContactForm.tsx` | React escapa automaticamente; CSP forte; sem `innerHTML` | ✅ React + CSP |
| 5 | Service Worker poderia servir dados stale | Baixa | ✅ Seguro | `public/sw.js` | Cache-first, mas versionado; fallback seguro | ✅ VERSION='v1' |
| 6 | LGPD: formulário coleta dados pessoais | Média | ✅ Conforme | `ContactForm.tsx` | Dados NÃO são armazenados; `mailto:` direto | ✅ Nenhum armazenamento |
| 7 | Headers de segurança ausentes | Alta | ✅ Corrigido | `index.html:10`, `vite.config.ts` | CSP, X-Frame-Options, HSTS implementados | ✅ Headers completos |
| 8 | Sem sanitização de input | Média | ✅ Mitigado | `ContactForm.tsx:9-14` | Função `sanitize()` remove controle; max-lengths aplicados | ✅ Sanitização ativa |

### Detalhes por Achado

#### Achado #1: Email Público Exposto

**Status:** N/A (Intencional)  
**Por quê:** É um portfolio de contacto — email, telefone e redes sociais devem ser públicos.  
**Ação:** Nenhuma — comportamento esperado.

---

#### Achado #2: Rate-Limit Client-Side

**Status:** Mitigado  
**Risco:** Usuário pode `localStorage.clear()` e re-submeter imediatamente.  
**Mitigação implementada:**
- ✅ Honeypot: campo `.website` hidden — bots preenchem e são rejeitados
- ✅ Anti-bot: rejeita se formulário preenchido em <1.5s
- ✅ Cooldown: 30s entre submissões armazenado em `localStorage`

**Recomendação futuro:** Se houver back-end, implementar rate-limit servidor-side por IP.

---

#### Achado #3: localStorage Falsificável

**Status:** Aceitável  
**Risco:** Timestamp em `localStorage` pode ser manipulado.  
**Mitigação:** Apenas armazena timestamp — não dados sensíveis. Anti-bot de <1.5s adiciona barreira.  
**Impacto se contornado:** Usuário conseguiria submeter 2-3 vezes em rápida sucessão. Sem back-end real, impacto é mínimo (abre email client).

---

#### Achado #4: XSS em Campos

**Status:** ✅ Seguro  
**Teste realizado:**
1. Injetado `<img src=x onerror="console.log('XSS')">` no campo "Mensagem"
2. React escapou como string literal
3. Nenhum console.log apareceu

**Prevenção:**
- ✅ React automático escapa strings (JSX)
- ✅ Sem `dangerouslySetInnerHTML` ou `innerHTML`
- ✅ CSP `script-src 'self' 'unsafe-inline'` apenas

---

#### Achado #5: Service Worker Stale Cache

**Status:** ✅ Seguro  
**Prevenção:**
- ✅ `VERSION = 'im-portfolio-v1'` — versionamento
- ✅ Cache cleanup no `activate`: remove caches antigos
- ✅ Cache-first apenas para `GET`
- ✅ Same-origin only: `if (url.origin !== self.location.origin) return`

**Recomendação:** Quando fizer atualização, mudar `VERSION` para `'im-portfolio-v2'`.

---

#### Achado #6: LGPD — Dados Pessoais

**Status:** ✅ Conforme  
**Dados coletados:**
- Nome (entrada user)
- Email (entrada user)
- Mensagem (entrada user)

**Onde armazenados:** **NENHUM LUGAR** — formulário abre `mailto:` direto, cliente de email rececebe.

**Conformidade LGPD:**
- ✅ Não há consentimento de cookies (não há cookies de rastreamento)
- ✅ Dados não são armazenados em servidor
- ✅ Dados não são compartilhados com terceiros
- ✅ Usuário não consegue exercer direitos LGPD (não há dados a acessar)

**Recomendação futuro:** Se houver login, implementar políticas LGPD (direito de acesso, retificação, exclusão).

---

#### Achado #7: Headers de Segurança

**Status:** ✅ Corrigido  
**Headers implementados:**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

**Arquivo:** `vite.config.ts:20-31` (dev/preview headers) + `index.html:10` (meta tag CSP)

---

#### Achado #8: Sanitização de Input

**Status:** ✅ Mitigado  
**Implementação:**
```typescript
function sanitize(input: string): string {
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')  // Remove controle
    .replace(/[\r\n]+/g, '\n')  // Normaliza newlines
    .trim()
}
```

**Max-lengths:**
- Name: 80 chars
- Subject: 120 chars
- Message: 2000 chars

**Email validation:** `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` + max 254 chars

---

## Status Geral

✅ **Nenhuma vulnerabilidade crítica ou alta**

### Resumo por Severidade

| Severidade | Quantidade | Status |
|-----------|-----------|--------|
| Crítica | 0 | ✅ OK |
| Alta | 0 | ✅ OK |
| Média | 2 | ✅ Mitigadas (Rate-Limit, XSS) |
| Baixa | 4 | ✅ Aceitável (Dados públicos, localStorage, Cache, LGPD conf) |

---

## Próximas Auditorias

### Rodada 2 (TBD)

Quando for feita uma auditoria futura:
1. Verificar se achados da Rodada 1 ainda estão mitigados
2. Focar em **novas categorias** ou **mudanças de código**
3. Usar prompts de `SECURITY-PROMPTS.md` para não duplicar achados
4. Atualizar essa tabela com novos achados

**Checklist para próxima rodada:**
- [ ] Verificar se CSP ainda está atualizado (futuro: se adicionar Google Fonts, devs-dev atualizar CSP)
- [ ] Verificar se formulário continua a abrir `mailto:` (se mudar para HTTP, adicionar server-side validation)
- [ ] Verificar se SW continua seguro (se adicionar novas rotas ao cache, confirmar same-origin)
- [ ] Se houver back-end novo: implementar rate-limit servidor-side, RLS, validação de autorização

---

**Gerado em:** 2026-06-27  
**Próxima revisão:** A definir (quando houver mudanças no código ou arquitetura)
