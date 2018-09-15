var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  emailContactOwner: { type: String, required: true }, //e-mail identificando o usuário a quem este contato pertence
  isUser: { type: Boolean, required: true },
  emailContact: { type: String, required: false }, // existe se este contato for também um usuário
  name: { type: String, required: false }, //preenche se isUSer for false
  cellPhone: { type: String, required: false }, //formato 0 + ddd + numero, preenche se isUSer for false
  }, { timestamps: true }
);


var Contacts = mongoose.model('Contact', contactSchema);
module.exports = Contacts;
