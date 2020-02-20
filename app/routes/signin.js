//session部分不可用，原因有待了解。其余部分调试成功，对接时将注释消掉即可

const express = require('express');
const router = express.Router();
//const session=require('express-session');


const NEUfix= require('../db/client').db('myproject');   //调试时使用myproject数据库，请根据本地的内容进行调整 @zwq
const user =NEUfix.collection('user')

console.log('router signin has loaded')

router.post('/',function(req,res){   
  console.log(req.session) 
  user.findOne({username:req.body.username}).then((result) =>{
      console.log(result)   
      if(result===null){
          res.send('user cant be found')//res.sendStatus(405).end()
      }else {
          if(result.password!=req.body.password){
          res.send('wrong password')//res.sendStatus(400).end()
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
/*
上面的get：
    先验证会话，对于已经登陆的用户无法重复登陆，
    没有登陆的，则渲染登陆界面 signin 
*/
module.exports = router;