var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
    mobile: {type: String},
    from: {type: Date},
    to: {type: Date},
    rooms: {type: Number}
});

var King = mongoose.model('King', bookSchema);
module.exports = King;

module.exports.saveBooking = function(newBooking, callback){
    newBooking.save(callback);
}
module.exports.findAll = function(callback){
    King.find(callback);
}
