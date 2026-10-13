# Revisão preventiva: links dos projetos e saúde geral

## Já conferido (sem problemas)
- Os 6 projetos abrem normalmente (resposta 200): O Verme Passeia, Figueiredo Law, Avalia Macapá, Oráculo do Caos, QA Master, Nyet Future.
- O mesmo endereço de cada projeto é usado em todas as partes do site: carrossel, ecossistema, dados para o Google, texto para robôs e arquivo para IAs.
- Nenhum link antigo sobrou (endereço antigo do Oráculo, Sweet Life).
- Site público /pt e /en no ar; contadores "6+" corretos; imagem de compartilhamento existe; última montagem do site sem erros.

## O que falta fazer (após aprovação)
1. Testar no navegador (celular e computador) clicando em cada botão "Visitar Projeto" e em cada cartão do ecossistema, confirmando que abre o projeto certo em nova aba.
2. Conferir os links de contato e redes (e-mail, LinkedIn, Instagram, Facebook, credencial Coursera) e o PDF do perfil.
3. Verificar a imagem externa usada em index.html (linha 80, arquivo hospedado fora do site); se estiver fora do ar, trocar pela imagem local já existente.
4. Rodar checagem de erros do código e varredura rápida de SEO; corrigir só o que estiver quebrado.
5. Entregar relatório curto com o resultado.

## Detalhes técnicos
- Playwright em 375/1440px, capturando `href` de todos os `a[target=_blank]` e validando com curl.
- Sem mudanças de layout, textos ou conteúdo, a menos que algo esteja quebrado.
