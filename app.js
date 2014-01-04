
/**
 * Module dependencies.
 */

var express = require('express');
var api = require('./api');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.methodOverride());
app.use(express.cookieParser('chavesecreta'));
app.use(express.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// api routes
app.get('/', function(req, res) {
	res.sendfile("index.html", {root: './public'});
})

app.get('/login', function(req, res) {
	res.sendfile("login.html", {root: './public'});
})

app.get('/signup', function(req, res) {
	res.sendfile("signup.html", {root: './public'});
})

api.router(app);

app.get('/*', function(req, res) {
	res.redirect("/#!" + req.originalUrl);
})

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

var workerManager = require("./worker");
workerManager.startAll();	