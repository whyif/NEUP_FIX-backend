//调试完成
const express = require('express');
const router = express.Router();



console.log('router signout has loaded')


router.get('/',function(req,res){
    if(req.session.username){
        delete req.session.username
        //res.status(200).end();
    }
        res.redirect('home')
    //如果得到收到/signout 的get请求，则删除会话的session达到注销目的
})


module.exports = router;
