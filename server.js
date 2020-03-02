
let App = require('./Models/App');

let Routers = require('./Rotas/Rotas');

App.Start(1234 || process.env.PORT);

Routers.Start(App.App(),__dirname,Routers);