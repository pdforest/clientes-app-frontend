const express = require('express');
const path = require('path');

const ngApp = express();

ngApp.use(express.static('./dist/clientes-app'));
/*
ngApp.use(
    express.static('./dist/clientes-app', {
        setHeaders: function(res, path) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
        }
    }
));
*/
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/clientes-app/index.html'));
});

ngApp.listen(process.env.PORT || 8090);
