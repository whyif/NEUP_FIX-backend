const express = require('express');
const router = express.Router();
const NEUfix=require('../../db/client').db('NEU_fix')
const user=NEUfix.collection('user')

router.get('/info',function(req,res){
  user.findOne({userid:req.session.userid}).then((reslut)=>{
    if(reslut==null){res.sendStatus(405).end()}
    else{res.sendStatus(200).json(reslut).end()}
  })
  //res.send(req.session.username+'your page')
})

/*router.get('/info/:userid', function(req, res) {
  console.log('userInfo page')
  res.render('userInfo')
})*/            //个人觉得只需要用session就够了，毕竟要先登录再看个人信息

router.put('/info/:userid',function(req,res){
  user.updateOne({userid:req.query.userid},{$set:req.body},function(err,reslut){
    if(reslut==null){res.sendStatus(400).end()}
    else{
      if(err){res.sendStatus(405).end()}
      else{res.sendStatus(200).end()}
    }
  })
  console.log('userinfo change')
})

module.exports = router;
