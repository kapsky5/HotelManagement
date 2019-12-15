var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
    mobile: {type: String},
    from: {type: Date},
    to: {type: Date},
    rooms: {type: Number}
});

var Booking = mongoose.model('Booking', bookSchema);
module.exports = Booking;

module.exports.saveBooking = function(newBooking, callback){
    newBooking.save(callback);
}
module.exports.checkAvailability = function(fromd, tod, callback){
    var query = {$or: [{from: {$gte: tod}}, {to: {$lte: fromd}}] }
    Booking.find(query, callback);
    // console.log("Inside Checking Function");
    // Booking.aggregate([
    //     {$match : query},
    //     {$group : {
    //         _id: null,
    //         total: {$sum: "$rooms"}
    //     }}
    // ], callback);
}