//cotroller/aquehora.js

var mongoose = require('mongoose');
var Horarios = mongoose.model('Horarios');

//GET - Return todos los horarios cargados
exports.findAll = function(req, res){
	Horarios.find(function (err, hora){
		if(err) res.send(500, err.message);
		console.log('GET /');
		res.status(200).jsonp(hora);
	});
}

//POST - Inserta un nuevo registro horario
exports.add = function(req, res){
	console.log('POST');
	console.log(req.body);
	var hora = new Horarios({
		origen : req.body.origen,
		destino: req.body.destino,
		horario: req.body.horario,
		informacion : req.body.info
	});

	hora.save(function(err, hora){
		if (err) return res.send(500, err.message);
		res.status(200).jsonp(hora);
	});
};

//PUT - Update a register already exists
exports.update = function(req, res) {
	Horarios.findById(req.params.id, function(err, hora) {
		hora.origen = req.body.origen;
		hora.destino = req.body.destino;
		hora.horario = req.body.horario;
		hora.informacion = req.body.info;

		hora.save(function(err) {
			if(err) return res.send(500, err.message);
			console.log('UPDATE')
			res.status(200).jsonp(hora);
		});
	});
};

//DELETE - Borra un horario
exports.delete = function(req, res) {
	Horarios.findById(req.params.id, function(err, hora) {
		hora.remove(function(err){
			if(err){
				return res.send(500, err.message);
			}else{
				res.json({ message: 'Successfully deleted' });
				console.log('Successfully deleted' );s	
			}
			
		});
	
	});

};

//GET - Obtener los horarios de colectivos dependiendo de la hora dada por PARAMETRO
exports.ColeProximos = function(req, res) {
	Horarios.find({"horario" : {$gte : req.params.hora}}, function(err, hora){
		if (err) {
			return res.send(500, { message : 'No found result'});
			
		}else{
			var a = [];
			var i = 0;	
			while (i < 3){
				if (hora[i] != null)
					a.push(hora[i]);
				i++;
			}
			res.status(200).jsonp(hora);
		}
	});


};

// GET - Obtiene los 3 siguiendes colectivos de la hora ACTUAL
exports.ColeAhora = function(req, res) {
		// Obtiene la hora actual
		var curr_time = new Date();
		var curr_h = curr_time.getHours();
		var curr_m = curr_time.getMinutes();
		//Genera el codigo de hora+minutos
		//FIXIT usar dateios y los datos oficiales para guardar horarios
		var curr_hour = (curr_h  * 100) + curr_m; 

	Horarios.find({"horario" : {$gte : curr_hour}}, function(err, hora){
		if (err){
			res.json({ message : 'No fund result'});
		}else{
			//Muestra las veces indicada por parametro
			var a = [];
			var i = 0;	
			while (i < 3){
				if (hora[i] != null)
					a.push(hora[i]);
				i++;
			}
			res.status(200).jsonp(a);
			//res.jsonp(a);
			
		}
	});

};
