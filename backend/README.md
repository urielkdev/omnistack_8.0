na pasta do back:
command: yarn init -y

Express: ajuda a lidar com as rotas(endereços) e views(formas de visualização)
command: yarn add express

Nodemon: ajuda com a reinicialização do server no desenvolvimento. -D no comando é para modo de desenvolvimento
command: yarn add -D nodemon
para ajudar na execução é bom fazer um scriptzinho, adiciona isto dentro do package.jason na parte de script:
  "dev": "nodemon server.js"
ai agora pode startar o server assim:
command: yarn dev

Entrar no mongodb atlas, criar um cluster, criar um user em "Database Access", em "Network Access" autorizar as urls, no cluster vai em "connect" e pega o "Connect Your Application" e copia para o mongoose.connect dentro do server.js

MongoDB Compass: serve para ver o teu banco de dados, baixa e conecta do mesmo jeito que o topico acima, mas dps de "connect" vai na opção do mongoDB Compass e copia o campo e abre o Compass que ele vai preencher o formulario automaticamente, aí só bota o usuário e senha e conecta

Socket.io: serve pro realtime







------------- Antigo \/ -----------------

Require Dir: para não precisar ficar dando require em todos os models criados na pasta 'models', aí isso da um require na pasta inteira

pra fazer as requisições, pode instalar um software bom nisso: insomnia.rest

Mongoose Paginate: para ajudar nos request de lista, pra não voltar a base inteira de dados que vc quer, dai ele volta apenas uma quantidade que você escolher por página
command: yarn add mongoose-paginate

Cors: para monitorar o acesso, se todos os dominios podem usar a sua api, ou apenas algumas, isso pode ser controlado depois da requisição do cors no app.use(cors()); ai ver na documentação como usar melhor
command: yarn add cors

para ver como upar no heroku: https://www.youtube.com/watch?v=-j7vLmBMsEU

Dotenv: para poder usar o .env no node
command: yarn add dotenv