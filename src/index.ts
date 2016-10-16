import http = require('http');
import server = require('./server');


import * as Configs from "./configurations";


//Starting Application Server
const serverConfigs = Configs.getServerConfigs();


http.createServer(server.app).listen(serverConfigs.port, () => {
    console.log('Express server listening on port ' + serverConfigs.port);
});
