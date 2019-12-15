const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const King = require('../models/king');
const Deluxe = require('../models/deluxe');
const Single = require('../models/single');
const User = require('../models/user');
const path = require("path");

var suites=0, kingr=0, deluxer=0, singler=0;


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

    var typex = req.body.type;

    if(typex === "Suites"){
        console.log("Inside Suite");
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

    else if(typex === "Deluxe Rooms"){
        console.log("Inside Deluxe Function");
        Deluxe.findAll(function(err,data){
            if(err) throw err;
            deluxer=0;
            if(data){
                data.forEach(element => {
                    deluxer+=element.rooms;
                });
                console.log(deluxer);
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
                        var favrooms = 0;
                        // console.log(data);
                        data.forEach(element => {
                            favrooms += element.rooms;
                        });
                        // console.log(favrooms);
                        let check = deluxer-favrooms;
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
                    let check = deluxer-favrooms;
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
    
    else if(typex === "Single"){
        console.log("Inside Single");
        Single.findAll(function(err,data){
            if(err) throw err;
            singler=0;
            if(data){
                data.forEach(element => {
                    singler+=element.rooms;
                });
                console.log(singler);
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
                        let check = singler-favrooms;
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
                    let check = singler-favrooms;
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
    
    else if(typex === "King Rooms"){
        console.log("inside King Rooms");
        King.findAll(function(err,data){
            if(err) throw err;
            kingr=0;
            if(data){
                data.forEach(element => {
                    kingr+=element.rooms;
                });
                console.log(kingr);
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
                        let check = kingr-favrooms;
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
                    // console.log(kingr);
                    let check = kingr-favrooms;
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