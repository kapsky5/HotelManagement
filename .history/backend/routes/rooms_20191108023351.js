const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/user');
const path = require("path");

let suites=0, king=0, deluxe=0, single=0;


router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../booking.html'))
})

router.post("/new", (req, res, next) => {
    // console.log(req.body);
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

    Booking.findAll(function(err,data){
        if(err) throw err;
        data.forEach(element => {
            suites+=element.room;
        });
        console.log(suites);
    });

    User.findByMobile(req.body.mobile, function(err,data){
        if(err) throw err;
        if(!data){
            User.saveUser(user, function(err, data){
                if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
                //Logic Code
                Booking.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    let favrooms = 0;
                    console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    console.log(favrooms);
                    let check = suites-favrooms;
                    console.log(4-check);
                    if(4-check >= req.body.room){
                        Booking.saveBooking(newBooking, function(err, data){
                            if(err) {
                                return res.json({status: false, message: "Booking Unsuccessfull!"});
                            }
                            return res.json({status: true, message: "Booking Successfull"});
                        });        
                    }
                    else{
                        return res.json({status: false, message:"Not Enough Rooms Available!"});
                    }
                });

                // Booking.saveBooking(newBooking, function(err, data){
                //     if(err) {
                //         return res.json({status: false, message: "Booking Unsuccessfull!"});
                //     }
                // });
                // return res.json({'message': message, status: true});
            });
        }
        if(data){
            User.saveUser(user, function(err, data){
                if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
                //Logic Code
                Booking.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    let favrooms = 0;
                    console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    console.log(favrooms);
                    console.log(suites);
                    let check = suites-favrooms;
                    console.log(4-check);
                    if(4-check >= req.body.room){
                        Booking.saveBooking(newBooking, function(err, data){
                            if(err) {
                                return res.json({status: false, message: "Booking Unsuccessfull!"});
                            }
                            return res.json({status: true, message: "Booking Successfull"});
                        });        
                    }
                    else{
                        return res.json({status: false, message:"Not Enough Rooms Available!"});
                    }
                });
            });
        }
    });
    // User.saveUser(user, function(err, data){
    //     if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
    //     Booking.saveBooking(newBooking, function(err, data){
    //         if(err) {
    //             return res.json({status: false, message: "Booking Unsuccessfull!"});
    //         }
    //     });
    //     return res.json({'message': message, status: true});
    // });
    

});

module.exports = router;