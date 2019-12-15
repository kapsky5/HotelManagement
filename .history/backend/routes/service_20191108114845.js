const express = require('express');
const router = express.Router();
const path = require('path');
const Car = require('../models/carBooking');

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

    newCar.saveBooking(function(err, data){
        if(err) return res.json({status: false, message:"Unsuccessfull"});
        return res.json({status: true, message: "Successfull"});
    });
});

module.exports = router;