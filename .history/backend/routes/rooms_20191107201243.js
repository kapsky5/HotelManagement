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
    User.saveUser(user, function(err, data){
        if(err) return res.json({status: false, response: err});
        return res.json({status: true, response: data});
    });
    Booking.saveBooking(newBooking, function(err, data){
        if(err) return res.json({status: false, response: err});
        return res.json({status: true, response: data});
    });
});

module.exports = router;