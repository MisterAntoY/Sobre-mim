
# Pricen:

Desenvolva:Public API — fornecedores exporem catálogo via endpoint, e tarefas basicas, melhorias de segurança, como sql injection, em caso de alteração do UserID/CorrentID, interceptação de comunicação entre client-servidor e alteração de formaulario enviado ao servidor, valores de assinaturas presentes apenas no servidor, para que caso o usuario tente alterar, o servidor verifique, faça o servidor fazer a verificação dos dados do user. Faça melhorias de segurança gerais em todo o projecto.

-
Adicione também o faturamento da pricen, somando todas as assinturas do plano pro e as assinaturas do plano fornecedores, permita que este grafico atualize sempre em tempo real, mediante a entrada de novos usuarios. Também me mostre todos os usuarios regsitrados: orçamentista e fornecedores. Quantidade de projectos criados, quantidade de materias na plataforma.
-

No pricen admin, quero que desenvolvas uma api que usa IA para puxar informações do produto, preço, tamanho,nome do site/marca, verifique disponibilidade de stock, ofertas de diferentes sites:https://www.linhacerta.ao/,https://shop.novasotecma.com/, https://zeloforte.com/loja/,https://www.ovarmatangola.com/,https://www.bricomat.online/,https://www.ncrangola.com/, https://electropanga.com/, https://dama.ao, adicione mais sites segundo as tuas pesquisas do mercado angolano de construção civil. Os sites sem preço de produtos não adicione ainda, desenvolva a API cumprindo todas boas praticas de codigo e segurança adicione apenas o no pricen admin, pois é apenas uma funcionaliadade de test. Questione qualquer duvida, caso precise de alguma coisa.
Como deve a API obter o HTML das páginas dos sites para a IA analisar?

Híbrido (fetch + fallback)

O que é que a API recebe como input e devolve?

Ambos os modos

Os resultados das extrações devem ser guardados na base de dados?

Não persistir — só devolver (Recomendado)

Tens uma chave da API da Anthropic (ANTHROPIC_API_KEY) para o Claude fazer a extração?

Ainda não tenho


# Ring2
Continue a desenvolver

# Minha-Vida
Busca os commits dos últimos 30 dias via GitHub API e mostra uma heatmap de contribuições. Prova que escreves código ativamente.
1. Implementa a secção de atividade GitHub ao vivo no portfólio usando a GitHub API pública para mostrar commits recentes e uma heatmap de contribuições



2. Versão em inglês (i18n)
PT / EN toggle
Fácil
Botão PT/EN no navbar. Toda a cópia num ficheiro JSON de traduções. Multiplica o alcance do portfólio para recrutadores internacionais.
Adiciona suporte i18n PT/EN ao portfólio com toggle no navbar, traduções em JSON e persistência em localStorage


3. Botão "Download CV"
PDF gerado ou estático
Fácil
Um botão no Hero e no Contacto que faz download do CV em PDF. Converte visitantes em contactos concretos imediatamente.

PDF estático
public/cv.pdf
Adiciona um botão de Download CV no Hero e na secção de Contacto do portfólio

4. 
Cursor personalizado
Trail animado na marca
Fácil
Cursor com dot verde que segue o rato com um leve delay (spring). Memorável e diferenciador — mostra atenção ao detalhe UI.

mousemove
requestAnimationFrame
CSS spring
Adiciona um cursor personalizado com dot verde e trail animado ao portfólio

5. 
Filtros de projetos por stack
React · PHP · Next.js · IA · etc.
Médio
Chips de filtro acima dos projetos. Clica "React" e apenas A2IE, Ring2 e Jerry ficam visíveis. Útil para recrutadores com stack específica.

useState
filter()
AnimatePresence
Adiciona filtros de stack (React, PHP, Next.js, IA, etc.) à secção de projetos do portfólio com animação de entrada/saída


6.
Linha do tempo / Percurso
Educação + experiência
Médio
Secção visual com timeline vertical animada ao scroll: formação, projetos marcantes e datas. Contextualiza a evolução profissional.

IntersectionObserver
SVG line
CSS animations 
Cria uma secção de linha do tempo / percurso no portfólio com educação e experiência, animada ao scroll

7.
Formulário de contacto funcional
Resend / EmailJS · sem backend
Médio
Formulário Nome + Email + Mensagem que envia email via Resend API (ou EmailJS). Sem backend próprio. Feedback de envio com toast.

EmailJS
react-hook-form
Zod
Sonner
Adiciona um formulário de contacto funcional ao portfólio usando EmailJS ou Resend com validação Zod e react-hook-form

8. 

PWA + ícone de app
Instalável no telemóvel
Médio
Manifest.json + service worker = portfólio instalável. Recrutador pode adicionar ao ecrã inicial. Demonstra conhecimento de PWA.
Converte o portfólio numa PWA instalável com vite-plugin-pwa, manifest.json e ícones

9.

Partículas interativas no Hero
Canvas + mouse repulsion
Avançado
Campo de partículas no background do Hero que reage ao movimento do rato (repulsão). Impacto visual imediato — primeiros 3 segundos contam.

Canvas 2D API
requestAnimationFrame
mousemove
Adiciona partículas interativas com mouse repulsion no Canvas do Hero do portfólio

10.
Radar chart de competências
Recharts RadarChart
Avançado
Alternativa visual às barras: radar chart com 6 eixos (Frontend, Backend, IA, UI/UX, Tooling, Segurança). Mais compacto e memorável.

Recharts
RadarChart
animação ao scroll
Substitui ou complementa as skill bars com um Radar Chart do Recharts na secção de competências do portfólio