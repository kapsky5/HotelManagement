const express = require('express');
const router = express.Router();
const path = require('path');
const Car = require('../models/carBooking');
const News = require('../models/news');

router.get('/', (req, res, err) => {
    res.sendFile(path.join(__dirname + '/../../services.html'));
});

router.post('/car', (req, res, err)=>{
    
    let newCar = new Car({
        mobile: req.body.mobile,
        date: req.body.date,
        time: req.body.time,
        loc: req.body.loc  
    });

    Car.saveBooking(newCar, function(err, data){
        if(err) return res.json({status: false, message:"Unsuccessfull"});
        return res.json({status: true, message: "Successfull"});
    });
});

router.post('/news', (req, res, err) => {
    let newSub = new News({
        email: req.body.email
    });
    News.findEmail(req.body.email, function(err, data){
        if(err) throw err;
        if(data){
            return res.json({status: true, message: "E-mail Already Exist"});
        }
        if(!data){
            News.subscribe(newSub, function(err, data){
                if(err) return res.json({status: false, message: "Some Error Occured! Try Again"});
                return res.json({status: true, message: "You are now Registered"});
            });
        }
    });
});

module.exports = router;