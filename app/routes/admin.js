const express = require('express');
const router = express.Router();

router.use('/',require('./admin/accept'))
router.use('/',require('./admin/announcement'))
router.use('/',require('./admin/mesg'))
module.exports=router;