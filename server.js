
let App = require('./Utils/App');

let Routers = require('./Rotas/Rotas');

App.Start(1235); // para testes na rede local'

//App.Start(process.env.PORT); // para deploy use apenas 'process.env.PORT'

Routers.Start(App.App(),__dirname,Routers);




