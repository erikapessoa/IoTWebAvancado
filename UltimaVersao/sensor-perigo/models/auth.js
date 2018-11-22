var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var authSchema = mongoose.Schema({

    local           : {
        email       : String,
        password    : String
    }
});

authSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

authSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Auth', authSchema);
