//session部分不可用，同signin.js。其他部分调试完毕，对接时删除注释即可
const express = require('express');
const router = express.Router();
const session=require('express-session');
const NEUfix= require('../db/client').db('NEU_fix'); //调试时使用myproject数据库，请根据本地的内容进行调整 @zwq
const user =NEUfix.collection('user')

console.log('router signup has loaded')

router.get('/',function(req,res){
    if(req.session.username){
        res.send(req.session.username+'you have sign in')  
      }else{
        res.render('../views/signup')
      }
  
})
/*
    上面的：get
    先验证会话，对于已经登陆的用户无法注册，
    没有登陆的，则渲染登陆界面 signup
*/



router.post('/',function(req,res){
    let sinupData=req.body
    var flag=true

    for(let i in sinupData){
        if(!sinupData[i]){
            flag=false
        }
        //for循环检测提交的数据是否有空白情况，有则不合格，flag为false，不允许插入数据
    }
    user.findOne({username:req.body.username}).then((result)=>{
    console.log(result)
    if(result===null&&flag){
        user.insertOne({
            username:req.body.username,
            password:req.body.password,
            truename:req.body.truename,
            tel:req.body.tel,
            qq:req.body.qq
        },function(err){
            if(err!=null){
                res.send(err)
            }else{
                req.session.username=req.body.username
                res.send('signup successfully')
            }
        })
    }else{
      res.send('user existed or some null error')
    }
    })
})

module.exports = router;
