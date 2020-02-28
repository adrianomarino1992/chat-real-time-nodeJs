
let App = require('./Models/App');

let Routers = require('./Rotas/Rotas');

App.Start(1234);

Routers.Start(App.App(),__dirname,Routers);