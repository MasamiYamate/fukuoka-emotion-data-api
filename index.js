const BodyParser = require('body-parser');
const Express = require('express');

//立ち上げサーバーのポート番号
const SERVER_PORT_NO = 3000;

app.use(function(req, res , next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(BodyParser.urlencoded({limit:'1024mb',extended: true, type: 'application/x-www-form-urlencoded'}));
app.use(BodyParser.json());