const mongoose = require('mongoose');
const schema = mongoose.Schema;

const carSchema = new Schema({
    mobile: {type: String},
    date: {type: String},
    time: {type: String},
    loc: {type: String}
});

var Car = mongoose.model('Car', carSchema);
module.exports = Car;