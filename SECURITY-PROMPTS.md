# Templates de Prompts para Auditoria de Segurança — IM Portfolio

Prompts prontos para usar com IA, estruturados conforme os 6 passos do guia.

**Referência:** O guia "Como criar um bom prompt para análise de segurança com IA"  
**Atualizado:** 2026-06-27

---

## Como Usar Este Arquivo

1. **Escolha o template** que corresponde ao seu escopo (Auditoria Geral, Categoria Específica, etc.)
2. **Customizar a seção "ESCOPO DESTA RODADA"** com a categoria/arquivo específico
3. **Copiar prompt inteiro**
4. **Colar em chat com IA** (Claude, ChatGPT, etc.)
5. **Documentar achados em `docs/SECURITY-AUDIT.md`**

---

## Template 1: Auditoria de Categoria Específica

Usar quando quer auditar **uma** categoria de risco (XSS, Rate-Limit, etc.) com profundidade.

```
Você é um especialista em segurança de aplicações revisando o IM Portfolio 
(https://isidro-mendes.dev), um portfolio React estático que estou testando 
com pentest autorizado no meu próprio sistema.

CONTEXTO DO SISTEMA:
- React 18 + TypeScript + Vite
- Front-end estático (sem back-end real, sem BD)
- PWA com Service Worker
- Capacitor para Android (opcional)
- Stack: React, TypeScript, Tailwind, Lucide icons
- NÃO usa: Kubernetes, AWS, IAM de nuvem, GraphQL, sessionStorage

ANTES DE COMEÇAR — LEIA ESTES DOCUMENTOS:
1. @doctork.md — auditoria consolidada anterior
2. docs/SECURITY.md — categorias de risco e prevenção atual
3. docs/SECURITY-AUDIT.md — achados anteriores com status
4. docs/SECURITY-CHECKLIST.md — o que já foi verificado e mitigado
5. SECURITY-PENTEST.md — testes prontos para rodar

**Não duplique achados já documentados.** Se algo está marcado como "Corrigido" 
em docs/SECURITY-AUDIT.md, aponte se ainda está correto no código atual.

ESCOPO DESTA RODADA:
Foque **apenas** em: [XSS / CSRF / Validação / Rate-Limiting / PWA / Headers / LGPD]
Arquivos relevantes: [src/components/ContactForm.tsx / public/sw.js / index.html / vite.config.ts]

PARA CADA ACHADO NOVO (não documentado em auditorias anteriores):

1. **Onde:** arquivo:linha (ex: src/components/ContactForm.tsx:45)
2. **Cenário de exploração:** "o que um atacante faria, passo a passo" — seja concreto
3. **Severidade:** Crítica/Alta/Média/Baixa com justificativa
4. **Como reproduzir:** comando, passo a passo no browser, ou código no console
5. **Correção sugerida:** arquivo/linha quando possível

NÃO FAÇA:
- Não suggest refatorar código que já está correto
- Não execute nada contra produção
- Se tiver dúvida sobre exploração real, marque como "Verificar manualmente" 
  em vez de inflar severidade
- Não reclame sobre "falta de back-end validation" se é site estático (isso é esperado)

Comece analisando.
```

---

## Template 2: Verificação Pontual

Usar quando quer **confirmar** que uma mitigação anterior ainda funciona.

```
Você é um especialista em segurança revisando IM Portfolio.

CONTEXTO:
React 18 + Vite, portfolio estático com formulário de contacto.

JÁ FOI AUDITADO:
- Rodada 1 (2026-06-27): Achados documentados em docs/SECURITY-AUDIT.md

TAREFA NESTA RODADA:
Verificar se a mitigação de [NOME-DO-ACHADO] ainda está implementada corretamente.
Achado original: [DESCRIÇÃO-DO-ACHADO-DE-2026-06-27]
Mitigação: [DESCRIÇÃO-DA-MITIGAÇÃO]
Arquivo: [src/components/ContactForm.tsx:45]

VERIFICAR:
1. Código ainda existe e é idêntico ao descrito em docs/SECURITY-AUDIT.md?
2. Não foi desabilitado/comentado acidentalmente?
3. Ainda funciona como esperado?

Se tudo OK: confirme "Mitigação válida, sem novos achados"
Se problema encontrado: descreva o novo achado com arquivo:linha
```

---

## Template 3: Novo Recurso — Auditoria Pré-Mergedesktop

Usar quando **novo código foi adicionado** e quer auditar antes de deploy.

```
Você é um especialista em segurança revisando IM Portfolio.

NOVO CÓDIGO ADICIONADO:
[DESCREVER O QUE FOI ADICIONADO — ex: "Novo endpoint de logout", "Campo de upload"]

ARQUIVO(S) MODIFICADO(S):
[src/components/NewFeature.tsx / src/lib/newLib.ts]

CONTEXTO HISTÓRICO:
Auditorias anteriores estão em @doctork.md e docs/SECURITY-AUDIT.md.
Site é React estático, sem back-end real.

ÁREAS DE RISCO PARA O NOVO CÓDIGO:
[Input validation / External data fetching / State mutations / Storage access]

PERGUNTAS-CHAVE:
1. Este novo código introduz XSS? (se aceita input do user)
2. Rate-limiting aplicado? (se há submissão)
3. Dados sensíveis armazenados? (se usa localStorage)
4. Chamadas externas seguras? (se fetch/API)
5. CSP compatível? (se carrega scripts/styles)

Analise o novo código acima com foco nessas áreas. Se tudo OK: "Seguro para mergeDesktop"
Se achados: descreva com arquivo:linha e severidade.
```

---

## Template 4: Pós-Deploy — Validação em Produção

Usar **após deploy** para confirmar que tudo funciona como esperado em produção.

```
Você é um especialista em segurança revisando IM Portfolio em produção.

DEPLOY INFO:
- URL: https://isidro-mendes.dev
- Deploy date: [DATA]
- Commit: [HASH ou TAG]

VALIDAÇÕES PÓS-DEPLOY:
1. Headers de segurança ainda estão sendo servidos?
   (curl -I https://isidro-mendes.dev | grep -E "CSP|X-Frame|X-Content")

2. Service Worker ainda está ativo?
   (DevTools → Application → Service Workers)

3. Bundle não contém secrets acidentalmente enviados?
   (strings https://isidro-mendes.dev/assets/*.js | grep -E "API_KEY|SECRET|TOKEN")

4. Rate-limiting funciona?
   (Submeter form 3x rapidamente, esperar 30s feedback)

5. Email validation funciona?
   (Tentar email inválido: test@, deve rejeitar)

Para cada validação: ✅ PASS ou ❌ FAIL com detalhes.

Se todos PASS: "Produção segura, sem achados"
Se algum FAIL: descreva o problema
```

---

## Template 5: Auditoria Rápida (5 minutos)

Usar para **health-check rápido** sem profundidade.

```
IM Portfolio — 5-minute security health-check.

Verificar 3 coisas:
1. Headers ainda estão lá? (CSP, X-Frame-Options, etc.)
2. Nenhum secret novo foi commitado? (npm audit, grep API_KEY)
3. Formulário ainda está seguro? (Teste XSS simples, rate-limit funciona?)

Responda em 3 bullets: "All good" ou "Needs attention: [O QUÊ]"
```

---

## Template 6: Seguimento de Achado Específico

Usar quando quer **aprofundar** em um achado já documentado.

```
Você é um especialista em segurança revisando IM Portfolio.

ACHADO ANTERIOR:
- ID: #2 (da docs/SECURITY-AUDIT.md)
- Descrição: "Rate-limit apenas client-side"
- Status: "Mitigado"
- Arquivo: src/components/ContactForm.tsx:43-73

TAREFA:
Aprofundar a análise deste achado:
1. Atual: cliente pode limpar localStorage → rate-limit contornável
2. Questão: É realmente um risco para este projeto?
3. Alternativas: Existem mitigações mais fortes sem back-end?
4. Recomendação: Reclassificar como crítica/alta/média/baixa?

Analise e recomende: aceitar o risco atual, ou implementar [MITIGAÇÃO ALTERNATIVA]?
```

---

## Como Estruturar Achados para docs/SECURITY-AUDIT.md

Após auditoria, documente assim:

```markdown
| # | Achado | Severidade | Status | Arquivo | Nota | Mitigation |
|---|--------|-----------|--------|---------|------|------------|
| 2 | Rate-limit apenas client-side | Média | Mitigado | ContactForm.tsx:43 | localStorage pode ser limpo | 30s cooldown + honeypot |
```

---

## Próximas Auditorias

**Cronograma recomendado:**

- Semanal: Health-check rápido (Template 5)
- Mensal: Verificação de dependências (npm audit)
- Trimestral: Auditoria de categoria (Template 1)
- Após novo feature: Pré-merge audit (Template 3)
- Após deploy: Validação em produção (Template 4)

---

## Links Úteis

- `@doctork.md` — Auditoria consolidada
- `docs/SECURITY.md` — Categorias de risco
- `docs/SECURITY-AUDIT.md` — Histórico de achados
- `docs/SECURITY-CHECKLIST.md` — Checklist vivo
- `docs/SECURITY-TESTING.md` — Por quê de cada teste
- `SECURITY-PENTEST.md` — Testes prontos para rodar

---

**Criado:** 2026-06-27  
**Próxima atualização:** Quando houver novos templates necessários
