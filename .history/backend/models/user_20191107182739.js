const mongoose = require('mongoose');
const Schmea = mongoose.Schema;

const userSchema = new Schema({
    fname: {type: String},
    lname: {type: String},
    mobile: {type: Number},
    email: {type: String}
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
