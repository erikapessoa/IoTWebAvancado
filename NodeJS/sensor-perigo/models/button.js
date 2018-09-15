var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buttonSchema = new Schema({
  buttonOwner: { type: String, required: true }, //e-mail identificando a pessoa a quem pertence este botão
  buttonUUID: { type: String, required: true }, //UUID do device
  values: [Boolean],
  currentValue: { type: Boolean, required: true }
  }, { timestamps: true }
);


var Buttons = mongoose.model('Button', buttonSchema);
module.exports = Buttons;
