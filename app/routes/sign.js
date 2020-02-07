const express = require('express');
const router = express.Router();
//const session=require('express-session');


const NEUfix= require('../db/client').db('NEU_fix');
const user =NEUfix.collection('user')
/*此处则是对数据库的client的导入，并且collection */


//-----------登录-------------------------------------

router.get('/signin',function(req,res){
    if(req.session.username){
        res.send(req.session.username+'you have signed in ')
      }else{
        res.render('signin')
      }
  
})

/*
上面的get：
    先验证会话，对于已经登陆的用户无法重复登陆，
    没有登陆的，则渲染登陆界面 signin 
*/

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
/*
    上面的：get
    先验证会话，对于已经登陆的用户无法注册，
    没有登陆的，则渲染登陆界面 signup
*/



router.post('/signup',function(req,res){
    let sinupData=req.body
    var flag=true

    for(let i in sinupData){
        if(!sinupData[i]){
            flag=false
        }
        //for循环检测提交的数据是否有空白情况，有则不合格，flag为false，不允许插入数据
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
              res.redirect('/home')
              //注册成功自动建立会话，并重定向到/home
          }
      })
  }else{
      //res.status(405).end()
      res.send('user existed or some null error')
  }
})
})
//注销账号
router.get('/signout',function(req,res){
    if(req.session.username){
        delete req.session.username
        res.status(200).end();
    }else{
        res.redirect('/signin')
    }
    //如果得到收到/signou 的get请求，则删除会话的session达到注销目的
})



//修改用户信息我改到了info页面

module.exports = router;
