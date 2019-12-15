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
        rooms: req.body.room
    });
    console.log('Ok1');
    let message = "Booking Successfull!";
    User.saveUser(user, function(err, data){
        if(err) return res.json({status: false, message: err});
        return res.json({status: false, message: data});
    });
    // Booking.saveBooking(newBooking, function(err, data){
    //     if(err) {
    //         message = err;
    //     }
    // });
    // return res.json({'message': message});

});

module.exports = router;