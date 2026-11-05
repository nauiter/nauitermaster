## Diagnóstico

- `nauitermaster.com`, `/pt` e `nauitermaster.lovable.app` estão no ar (abrem normalmente).
- `www.nauitermaster.com` não responde: esse endereço nunca foi conectado ao site, e o DNS não aponta para ele. Quem digita "www" vê o site fora do ar.

## O que fazer

1. Conectar `www.nauitermaster.com` em Configurações do Projeto → Domínios (abro o assistente de conexão para você).
2. No seu provedor de domínio, criar o registro A `www` → `185.158.133.1` (o assistente mostra os valores exatos).
3. Depois que o DNS propagar, `www` vai redirecionar automaticamente para `nauitermaster.com`, que continua sendo o endereço principal.
4. Conferir de novo os dois endereços e as páginas PT/EN.

Nenhuma mudança no conteúdo ou no visual do site.
