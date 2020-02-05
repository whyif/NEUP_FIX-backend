var express = require('express');
var router = express.Router();

router.get('/info',function(req,res){
  
  res.send(req.session.username+'your page')
})

router.get('/info/:userid', function(req, res) {
  console.log('userInfo page')
  res.render('userInfo')
})

router.put('/info/:userid',function(req,res){
  console.log('userinfo change')
})

module.exports = router;
