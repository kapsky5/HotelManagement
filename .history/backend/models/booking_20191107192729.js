var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
    mobile: {type: String},
    from: {type: Date},
    to: {type: Date},
    rooms: {type: Number}
});

var Booking = mongoose.model('Booking', bookSchema);
module.exports = Booking;

module.exports.saveBooking = function(newBooking , callback){
    newBooking.save(callback);
}