const express = require('express');
const router = express.Router();

router.use('/',require('./user/apply'))
router.use('/',require('./user/info'))
router.use('/',require('./user/mesg'))
module.exports=router;