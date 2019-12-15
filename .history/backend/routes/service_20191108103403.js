const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, err) => {
    res.sendFile(path.join(__dirname + '/../../services.html'));
});

router.post('/car', (req, res, err)=>{

});

module.exports = router;