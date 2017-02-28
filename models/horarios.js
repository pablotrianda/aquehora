//models/horarios.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HorarioSchema = new Schema({
	origen : String,
	destino: String,
	horario: Number,
	informacion: String
});

module.exports = mongoose.model('Horarios', HorarioSchema);
