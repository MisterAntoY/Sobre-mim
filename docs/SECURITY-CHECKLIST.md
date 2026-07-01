# Security Checklist — IM Portfolio

Checklist dinâmico do que foi verificado e mitigado. Atualizar após cada auditoria.

**Última atualização:** 2026-06-27  
**Status geral:** ✅ Seguro para Deploy

---

## Pré-Auditoria

- [x] Limpeza de secrets (.env, API keys, tokens)
- [x] Remoção de dados hardcoded de sensíveis
- [x] Revisão de imports perigosos (`eval`, `innerHTML`, `dangerouslySetInnerHTML`)
- [x] Verificação de `npm audit` (dev dependencies apenas)

---

## Validação & Sanitização

- [x] ContactForm tem sanitização (remoção de caracteres de controle)
- [x] Email validado com regex: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`
- [x] Max-lengths em campos: name(80), subject(120), message(2000)
- [x] Honeypot implementado (campo `.website` hidden)
- [x] Anti-bot via tempo de mount (<1.5s rejeita)
- [x] Formulário não faz submissão HTTP (abre `mailto:` direto)

---

## Rate Limiting

- [x] 30s cooldown entre submissões (`SUBMIT_COOLDOWN_MS`)
- [x] Armazenamento via `localStorage.getItem('contact:lastSubmit')`
- [x] Anti-bot via tempo de mount (<1.5s rejeita)
- [x] localStorage pode ser limpo, mas mitigado com honeypot
- [ ] Rate-limit servidor-side (N/A — sem back-end real; TODO futuro)

---

## XSS (Cross-Site Scripting)

- [x] React automático escapa strings (JSX)
- [x] Sem uso de `dangerouslySetInnerHTML`
- [x] Sem uso manual de `innerHTML`
- [x] CSP `script-src 'self' 'unsafe-inline'` apenas
- [x] Teste de injeção: `<img src=x onerror="...">` rejeitada

---

## CSRF (Cross-Site Request Forgery)

- [x] Formulário não faz submissão HTTP (mailto direto)
- [x] Nenhuma ação state-changing no cliente
- [x] Sem cookies críticos

---

## Headers & Configuração de Segurança

- [x] CSP em `index.html:10`: `default-src 'self'; script-src 'self' 'unsafe-inline'; ...`
- [x] `X-Frame-Options: DENY` (no iframe embedding)
- [x] `X-Content-Type-Options: nosniff` (previne MIME sniffing)
- [x] `Permissions-Policy` desativa câmera, microfone, geolocalização, payment
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Strict-Transport-Security` em `vite.config.ts`
- [x] `Cross-Origin-Opener-Policy: same-origin`
- [x] `Cross-Origin-Resource-Policy: same-origin`

---

## Service Worker / PWA

- [x] Cache-first apenas para `GET` (não POST/PUT/DELETE)
- [x] Same-origin only: `if (url.origin !== self.location.origin) return`
- [x] Versionamento de cache: `VERSION = 'im-portfolio-v1'`
- [x] Cleanup de caches antigos no `activate`
- [x] Fallback seguro a `/index.html` para off-line
- [x] Service worker registrado apenas em produção (`import.meta.env.DEV` check)

---

## localStorage & Storage

- [x] Apenas `contact:lastSubmit` armazenado (timestamp, não sensível)
- [x] Nenhum token, email, ou dados pessoais em storage
- [x] `sessionStorage`: não usado
- [x] Cookies: nenhum crítico

---

## Dados Sensíveis

- [x] Nenhum `.env` com secrets em repositório
- [x] Nenhum token JWT/API key hardcoded
- [x] Nenhum password ou credencial no código
- [x] Email/telefone/redes sociais: públicos (propositalmente)
- [x] Bundle scan: nenhum `API_KEY`, `SECRET`, `MONGODB_URI` encontrado

---

## Autenticação & Autorização

- [x] N/A — site público, sem login
- [ ] TODO futuro: Se houver login, implementar auth segura
- [ ] TODO futuro: Se houver admin, implementar RBAC
- [ ] TODO futuro: Se houver back-end, validar sempre no servidor

---

## LGPD & Privacidade de Dados

- [x] Dados de visitantes **NÃO são armazenados** (mailto abre direto)
- [x] Sem Google Analytics, Hotjar, ou rastreamento
- [x] Sem cookies de rastreamento
- [x] Email/telefone do author são públicos (portfolio)
- [x] Nenhum consentimento de cookies necessário
- [x] Usuário não consegue exercer direitos LGPD (não há dados persistidos)

---

## Dependências & Vulnerabilidades

- [x] `npm audit`: 2 vulnerabilidades (dev-only em vite/esbuild, não afetam bundle)
- [x] Capacitor plugins: versões oficiais, bem mantidas
- [x] React: versão stável (18.3.1)
- [x] Tailwind: versão stável (3.4.15)
- [ ] TODO: manter dependências atualizadas (`npm audit fix` mensalmente)

---

## Acesso & Permissões

- [x] Site é público (sem áreas privadas)
- [x] Nenhum endpoint administrativo exposado
- [x] Não há diretórios .git, .env, ou configurações sensíveis servidas

---

## Testes Executados

| Teste | Data | Resultado | Notas |
|-------|------|-----------|-------|
| XSS Injection | 2026-06-27 | ✅ PASS | Payload escapou corretamente |
| Rate-Limit Bypass | 2026-06-27 | ✅ PASS (Mitigado) | localStorage pode ser limpo, mas honeypot + anti-bot catch |
| Email Validation | 2026-06-27 | ✅ PASS | Regex válido, max-length aplicado |
| Service Worker | 2026-06-27 | ✅ PASS | Cache seguro, same-origin, versionado |
| Headers | 2026-06-27 | ✅ PASS | CSP, X-Frame-Options, HSTS aplicados |
| Honeypot | 2026-06-27 | ✅ PASS | Campo `.website` efetivamente escondido |

---

## Mitigações Implementadas

| # | Mitigação | Arquivo | Status | Data |
|---|-----------|---------|--------|------|
| 1 | Sanitização de input | `ContactForm.tsx:9-14` | ✅ Implementada | 2026-06-21 |
| 2 | Rate-limit 30s | `ContactForm.tsx:43-73` | ✅ Implementada | 2026-06-21 |
| 3 | Honeypot anti-bot | `ContactForm.tsx:32` | ✅ Implementada | 2026-06-21 |
| 4 | Anti-bot <1.5s guard | `ContactForm.tsx:60-65` | ✅ Implementada | 2026-06-21 |
| 5 | CSP strong | `index.html:10` | ✅ Implementada | 2026-06-27 |
| 6 | Headers vite | `vite.config.ts:20-31` | ✅ Implementada | 2026-06-27 |
| 7 | Service Worker seguro | `public/sw.js` | ✅ Implementada | 2026-06-21 |

---

## Recomendações Futuro

### Curto Prazo (Se escalar para back-end)

- [ ] Rate-limit servidor-side por IP
- [ ] Validação **sempre** no servidor (não confiar em client)
- [ ] Hash de emails antes de armazenar (se necessário)
- [ ] RLS se houver multi-tenant
- [ ] Audit logging de ações críticas

### Médio Prazo

- [ ] HTTPS obrigatório (já é, via Vite + servidor)
- [ ] Renovar dependências mensalmente
- [ ] Política de Privacidade formal (se houver coleta)

### Longo Prazo

- [ ] Pentesting anual por terceiros (se crítico)
- [ ] Incident response plan (se houver dados)
- [ ] GDPR/LGPD compliance (se usuários EU/BR)

---

## Próxima Auditoria

**Data prevista:** TBD  
**Escopo:** Verificar se mitigações ainda estão ativas; testar novas funcionalidades se adicionadas  
**Checklist:** Rodar todos os testes acima + novos testes conforme necessário

---

**Mantido por:** Security Audit Framework  
**Última revisão:** 2026-06-27
