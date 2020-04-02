//调试完成，对接部分待定
const express = require('express');
const router = express.Router();
const session=require('express-session');
const NEUfix= require('../db/client').db('myproject'); //调试时使用myproject数据库，请根据本地的内容进行调整 @zwq
const user =NEUfix.collection('user')

console.log('router signup has loaded')

router.get('/',function(req,res){
    res.render('../views/signup')
})
/*
      登陆了就不能注册了吗？已修改    @zwq
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
                res.send(req.body.username+' you have signed up successfully,now please signin')
            }
        })
    }else{
      res.send('user existed or some null error')
    }
    })
})

module.exports = router;
