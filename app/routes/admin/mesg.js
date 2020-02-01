const express = require('express');
const router = express.Router();
const NEUfix= require('../../db/client').db('NEU_fix');

    const mesg=NEUfix.collection('mesg')
    
module.exports=router;