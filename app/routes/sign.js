const express = require('express');
const router = express.Router();
//const session=require('express-session');


const NEUfix= require('../db/client').db('NEU_fix');
const user =NEUfix.collection('user')


//-----------登录-------------------------------------

router.get('/signin',function(req,res){
    if(req.session.username){
        res.send(req.session.username+'you have signed in ')
      }else{
          console.log('please log')
        res.render('signin')
      }
  
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
          res.redirect('/home');
          }
      }
  })
})


// ------------注册------------------------------------------
router.get('/signup',function(req,res){
    if(req.session.username){
        res.send(req.session.username+'you have sign in')
      }else{
          console.log('please log')
        res.render('signup')
        console.log('signup page')
      }
  
})
router.post('/signup',function(req,res){
    let sinupData=req.body
    var flag=true
    for(let i in sinupData){
        if(!sinupData[i]){
            flag=false
        }
    }
user.findOne({username:req.body.username}).then((result)=>{
  if(result===null&&flag){
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
              //res.status(200).end()
              req.session.username=req.body.username
              res.redirect('http://localhost:8080/home')
          }
      })
  }else{
      //res.status(405).end()
      res.send('user existed or some null error')
  }
})
})

router.put('/home/signup',function(req,res){    //修改个人信息,有待修改

})

module.exports = router;
