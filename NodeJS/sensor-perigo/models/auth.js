var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var authSchema = mongoose.Schema({

    local           : {
        UUID        : String,
        token       : String
    }
});

authSchema.methods.generateHash = function(token) {
    return bcrypt.hashSync(token, bcrypt.genSaltSync(8), null);
};

authSchema.methods.validPassword = function(token) {
    return bcrypt.compareSync(token, this.local.token);
};

module.exports = mongoose.model('Auth', authSchema);
