//!!!!!!!!未调试，原因同signin.js!!!!!!!!!!
const express = require('express');
const router = express.Router();
//const session=require('express-session');
const NEUfix= require('../db/client').db('myproject'); //调试时使用myproject数据库，请根据本地的内容进行调整 @zwq
const user =NEUfix.collection('user')

console.log('router signout has loaded')


router.get('/',function(req,res){
    if(req.session.username){
        delete req.session.username
        res.status(200).end();
    }else{
        res.redirect('/signin')
    }
    //如果得到收到/signout 的get请求，则删除会话的session达到注销目的
})



//修改用户信息我改到了info页面

module.exports = router;
