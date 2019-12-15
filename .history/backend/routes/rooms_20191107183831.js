const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/user');

router.post("/new", (req, res, next) => {
    const User = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email
    });
    const newBooking = new Booking({
        from: req.body.from,
        to: req.body.to
    })
})

module.exports = router;