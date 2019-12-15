const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const King = require('.../models/king');
const Deluxe = require('../models/deluxe');
const Single = require('../models/single');
const User = require('../models/user');
const path = require("path");

var suites=0, king=0, deluxe=0, single=0;


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

    let typex = req.body.type;

    if(typex == "Suites"){
        Booking.findAll(function(err,data){
            if(err) throw err;
            suites=0;
            if(data){
                data.forEach(element => {
                    suites+=element.rooms;
                });
                console.log(suites);
            }
            
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
                        // console.log(data);
                        data.forEach(element => {
                            favrooms += element.rooms;
                        });
                        // console.log(favrooms);
                        let check = suites-favrooms;
                        // console.log(4-check);
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
                Booking.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    let favrooms = 0;
                    // console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    // console.log(favrooms);
                    // console.log(suites);
                    let check = suites-favrooms;
                    // console.log(4-check);
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
            }
        });    
    }

    else if(typex == "Deluxe Rooms"){
        Deluxe.findAll(function(err,data){
            if(err) throw err;
            suites=0;
            if(data){
                data.forEach(element => {
                    suites+=element.rooms;
                });
                console.log(suites);
            }
            
        });
    
        User.findByMobile(req.body.mobile, function(err,data){
            if(err) throw err;
            if(!data){
                User.saveUser(user, function(err, data){
                    if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
                    //Logic Code
                    Deluxe.checkAvailability(req.body.from, req.body.to, function(err, data){
                        if(err) throw err;
                        let favrooms = 0;
                        // console.log(data);
                        data.forEach(element => {
                            favrooms += element.rooms;
                        });
                        // console.log(favrooms);
                        let check = suites-favrooms;
                        // console.log(4-check);
                        if(4-check >= req.body.room){
                            Deluxe.saveBooking(newBooking, function(err, data){
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
    
                    // Deluxe.saveBooking(newBooking, function(err, data){
                    //     if(err) {
                    //         return res.json({status: false, message: "Booking Unsuccessfull!"});
                    //     }
                    // });
                    // return res.json({'message': message, status: true});
                });
            }
            if(data){
                Deluxe.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    let favrooms = 0;
                    // console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    // console.log(favrooms);
                    // console.log(suites);
                    let check = suites-favrooms;
                    // console.log(4-check);
                    if(4-check >= req.body.room){
                        Deluxe.saveBooking(newBooking, function(err, data){
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
            }
        });    
    }
    
    else if(typex == "Single"){
        Single.findAll(function(err,data){
            if(err) throw err;
            suites=0;
            if(data){
                data.forEach(element => {
                    suites+=element.rooms;
                });
                console.log(suites);
            }
            
        });
    
        User.findByMobile(req.body.mobile, function(err,data){
            if(err) throw err;
            if(!data){
                User.saveUser(user, function(err, data){
                    if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
                    //Logic Code
                    Single.checkAvailability(req.body.from, req.body.to, function(err, data){
                        if(err) throw err;
                        let favrooms = 0;
                        // console.log(data);
                        data.forEach(element => {
                            favrooms += element.rooms;
                        });
                        // console.log(favrooms);
                        let check = suites-favrooms;
                        // console.log(4-check);
                        if(4-check >= req.body.room){
                            Single.saveBooking(newBooking, function(err, data){
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
    
                    // Single.saveBooking(newBooking, function(err, data){
                    //     if(err) {
                    //         return res.json({status: false, message: "Booking Unsuccessfull!"});
                    //     }
                    // });
                    // return res.json({'message': message, status: true});
                });
            }
            if(data){
                Single.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    let favrooms = 0;
                    // console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    // console.log(favrooms);
                    // console.log(suites);
                    let check = suites-favrooms;
                    // console.log(4-check);
                    if(4-check >= req.body.room){
                        Single.saveBooking(newBooking, function(err, data){
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
            }
        });    
    }
    
    else if(typex == "King Rooms"){
        King.findAll(function(err,data){
            if(err) throw err;
            suites=0;
            if(data){
                data.forEach(element => {
                    suites+=element.rooms;
                });
                console.log(suites);
            }
            
        });
    
        User.findByMobile(req.body.mobile, function(err,data){
            if(err) throw err;
            if(!data){
                User.saveUser(user, function(err, data){
                    if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
                    //Logic Code
                    King.checkAvailability(req.body.from, req.body.to, function(err, data){
                        if(err) throw err;
                        let favrooms = 0;
                        // console.log(data);
                        data.forEach(element => {
                            favrooms += element.rooms;
                        });
                        // console.log(favrooms);
                        let check = suites-favrooms;
                        // console.log(4-check);
                        if(4-check >= req.body.room){
                            King.saveBooking(newBooking, function(err, data){
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
    
                    // King.saveBooking(newBooking, function(err, data){
                    //     if(err) {
                    //         return res.json({status: false, message: "Booking Unsuccessfull!"});
                    //     }
                    // });
                    // return res.json({'message': message, status: true});
                });
            }
            if(data){
                King.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    let favrooms = 0;
                    // console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    // console.log(favrooms);
                    // console.log(suites);
                    let check = suites-favrooms;
                    // console.log(4-check);
                    if(4-check >= req.body.room){
                        King.saveBooking(newBooking, function(err, data){
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
            }
        });    
    }

});

module.exports = router;