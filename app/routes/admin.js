const express = require('express');
const router = express.Router();

router.use('/accept',require('./admin/accept'))
router.use('/announcement',require('./admin/announcement'))
router.use('/mesg_ad',require('./admin/mesg_ad'))   //修改了url，否则按照本来写法/home/mesg时会出现同时require两个中间件的情况
//!!!!!!!!!!!!!!!!尚未联系前端！！！！！！！！！！！！！！

/*
原：
router.use('/',require('./admin/accept'))
router.use('/',require('./admin/announcement'))
router.use('/',require('./admin/mesg'))
供参考*/
module.exports=router;