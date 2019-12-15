const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/user');

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
    if(S1&s2) {
        return {'status': true};
    }
    else {
        return {'status': false};
    }
});

module.exports = router;