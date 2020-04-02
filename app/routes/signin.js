//调试完成，交互部分有待修改

const express = require('express');
const router = express.Router();
const session=require('express-session');


const NEUfix= require('../db/client').db('myproject');  
const user =NEUfix.collection('user')

console.log('router signin has loaded')

router.post('/',function(req,res){   
  console.log(req.session.username) 
  user.findOne({username:req.body.username}).then((result) =>{
      console.log(result)   
      if(result===null){
          res.send('user cant be found')
      }else {
          if(result.password!=req.body.password){
          res.send('wrong password')
          }else{
          req.session.username=req.body.username
          console.log('log in successfully '+req.session.username)
          res.redirect('/home')
          }
      }
  })
})
router.get('/',function(req,res){
    if(req.session.username){
        res.send(req.session.username+' you have signed in ')
      }else{
        res.render('../views/signin.html')
      }
})
module.exports = router