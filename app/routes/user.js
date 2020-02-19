var express = require('express');
var router = express.Router();

router.use('/apply',require('./user/apply'))
router.use('/info',require('./user/info'))
router.use('/mesg',require('./user/mesg'))   

/*原：
router.use('/',require('./user/apply'))
router.use('/',require('./user/info'))
router.use('/',require('./user/mesg'))
供参考*/ 
module.exports=router;