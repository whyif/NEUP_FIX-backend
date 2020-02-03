const express = require('express');
const router = express.Router();
const session=require('express-session');


const NEUfix= require('../db/client').db('NEU_fix');
const user =NEUfix.collection('user')

//const user=require('../db/client').user;

//-----------登录-------------------------------------

router.get('/signin',function(req,res){
  console.log('signin page')
  res.render('signin')
})

router.post('/signin',function(req,res){    
  user.findOne({username:req.body.username}).then((result) =>{   
      if(result===null){
          res.sendStatus(405).end()
      }else {
          if(result.password!=req.body.password){
          res.sendStatus(400).end()
          }else{
          req.session.username=req.body.username
          res.redirect('/');
          }
      }
  })
})


// ------------注册------------------------------------------
router.get('signup',function(req,res){
  console.log('signup page')
})
router.post('/signup',function(req,res){
user.findOne({username:req.body.username}).then((result)=>{
  if(result===null){
      user.insertOne({
          username:req.body.username,
          password:req.body.password,
          truename:req.body.truename,
          tel:req.body.tel,
          qq:req.body.qq,
          verfication:req.body.verfication
      },function(err){
          if(err!=null){
              res.status(400).end()
          }else{
              res.status(200).end()
          }
      })
  }else{
      res.status(405).end()
  }
})
})

router.put('/home/signup',function(req,res){    //修改个人信息

})

module.exports = router;
