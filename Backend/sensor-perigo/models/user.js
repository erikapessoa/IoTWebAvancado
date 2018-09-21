var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema ({
  publicPlace: { type: String, required: true},
  number: {type: Number, required: true },
  neighborhood: {type: String, required: true },
  city: {type: String, required: true },
  state: {type: String, required: true },
  country: {type: String, required: true },
  zipcode: {type: String, required: true }
  },  { timestamps: true }
);

var cellPhoneSchema = new Schema ({
  ddi: {type: Number, required: true },
  ddd: { type: Number, required: true},
  number: {type: String, required: true },
  }, { timestamps: true }
);

var userSchema = new Schema({
  email: {type: String, required: true, unique: true },
  password: {type: String, required: true },
  name: { type: String, required: true },
  dateOfBirthday: { type: String, required: true },
  rg: { type: String, required: true },
  cpf: { type: String, required: true },
  sex: { type: String, required: true },
  nationality: {type: String, required: true },
  maritalStatus: {type: String, required: true },
  uuid: {type: String, required: true },
  token: {type: String, required: true },
  address: addressSchema,
  cellPhone: cellPhoneSchema
  }, { timestamps: true }
);

var Users = mongoose.model('User', userSchema);
module.exports = Users;


/*

{
  "email": "erika@gmail.com",
  "password": "12345",
  "name": "erika",
  "dateOfBirthday": "16/09/2000",
  "rg": "550000",
  "cpf": "11111111111",
  "sex": "F",
  "nationality": "brasileira",
  "maritalStatus":"solteira",
  "address":
		{
  	       "publicPlace": "lalala",
			"number": 30,
			"neighborhood": "lelelele",
			"city": "Recife",
			"state": "PE",
			"country": "Brasil",
			"zipcode": "55000000"
		},
	"cellPhone":
		{
			"ddi": 55,
			"ddd": 81,
			"number": "888888889"
		}
}

*/
