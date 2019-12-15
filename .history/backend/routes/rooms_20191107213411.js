const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/user');
const path = require("path");

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../booking.html'))
})

router.post("/new", (req, res, next) => {
    console.log(req.body);
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email
    });
    const newBooking = new Booking({
        from: req.body.from,
        to: req.body.to,
        mobile: req.body.mobile,
        rooms: req.body.rooms
    });
    console.log('Ok1');
    let s1 = false, s2 = false;
    User.saveUser(user, function(err, data){
        if(err) return res.json({status: false, response: err});
        s1 = true;
    });
    Booking.saveBooking(newBooking, function(err, data){
        if(err) return res.json({status: false, response: err});
        s2= true;
    });
    if(s1&s2) {
        return res.json({'message': "Booking Confirmed!!"});
    }
    else {
        return res.json({'message': 'Some error occured!'});
    }
});

module.exports = router;