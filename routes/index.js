const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/',function(req,res,next){
    console.log(`GET!!`);
    res.sendFile(path.join(__dirname,'../..','client/build/index.html'))
});

module.exports = router;