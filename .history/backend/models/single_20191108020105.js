var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
    mobile: {type: String},
    from: {type: Date},
    to: {type: Date},
    rooms: {type: Number}
});

var Single = mongoose.model('Single', bookSchema);
module.exports = Single;

module.exports.saveBooking = function(newBooking, callback){
    newBooking.save(callback);
}

module.exports.findAll = function(callback){
    Single.find(callback);
}
