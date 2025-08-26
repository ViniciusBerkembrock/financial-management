*Comandos inicialização:*

npm run dev
npm run test:watch
docker compose -f infra/compose.yaml up -d


*Infraestrutura:*

Foi criada uma imagem do postgres para o docker
Isso foi feito configurando o compose.yaml (novo padrão de nomemclatura)
Alterado as portas padrão para 1998:1998
Foi instalado o pg para poder conectar a aplicação ao banco local gerado através da imagem docker
