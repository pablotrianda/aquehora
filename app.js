//app.js

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();

//Database connnection
mongoose.connect('mongodb://localhost/Horarios', function(err, res){
		if (err) throw err;
		console.log('Connected to Database');
});

//Midlewares
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Import Models and Controllers
var models = require('./models/horarios')(app, mongoose);
var Horarios = require('./controller/aquehora');

var router = express.Router();


//API Routers 

var api = express.Router();

// Basic CRUD
api.route('/aquehora')
	.get(Horarios.findAll)
	.post(Horarios.add);

api.route('/aquehora/:id')
	.put(Horarios.update)
	.delete(Horarios.delete);

// Funcionalidades
api.route('/aquehora/prox')
	.get(Horarios.ColeAhora);

// Funcionalidades
api.route('/aquehora/prox/:hora')
	.get(Horarios.ColeProximos);


app.use('/api', api);

// Set index page
app.get('*', function(req,res){
	res.sendfile('./public/index.html');
});

//Start Server
app.listen(3000,function(){
	console.log("Node Server is running on http://localhost:3000");
	console.log("Ctrl+c for exit");

});


