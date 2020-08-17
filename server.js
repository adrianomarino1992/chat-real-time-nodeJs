
let App = require('./Models/App');

let Routers = require('./Rotas/Rotas');

App.Start(process.env.PORT); // para deploy use apenas 'process.env.PORT'

Routers.Start(App.App(),__dirname,Routers);




