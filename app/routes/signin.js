//session部分不可用，原因有待了解。其余部分调试成功，对接时将注释消掉即可

const express = require('express');
const router = express.Router();
const session=require('express-session');


const NEUfix= require('../db/client').db('NEU_fix');  
const user =NEUfix.collection('user')

console.log('router signin has loaded')

router.post('/',function(req,res){   
  console.log(req.session) 
  user.findOne({username:req.body.username}).then((result) =>{
      console.log(result)   
      if(result===null){
          res.send('user cant be found')
      }else {
          if(result.password!=req.body.password){
          res.send('wrong password')
          }else{
          //req.session.username=req.body.username
          //res.redirect('/home');
          res.send('log in successfully ')  

          }
      }
  })
})
router.get('/',function(req,res){
    if(req.session.username){
        res.send(req.session.username+'you have signed in ')
      }else{
        res.render('../views/signin')
      }
})
module.exports = router