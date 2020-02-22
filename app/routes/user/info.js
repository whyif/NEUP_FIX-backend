//调试成功，并且使用了objectid作为userID使用
//唯一的问题还是session
const express = require('express');
const router = express.Router();
const NEUfix=require('../../db/client').db('myproject')
const user=NEUfix.collection('user')

router.get('/',function(req,res){
  res.render('userinfo')
})

router.get('/:userid',function(req,res){
  user.findOne({userid:req.params.userid}).then((reslut)=>{
    if(reslut==null){
      res.send('user not found')//res.sendStatus(405).end()
    }
    else{
      console.log(reslut)//res.sendStatus(200).json(reslut).end()
    }
  })
})

router.post('/',function(req,res){
    let upData=req.body
    let flag=true
    for(let i in upData){//判断数据是否有空
      if(!upData[i]){
        flag=false
      }
    }
    if(flag){
      user.findOne({username:req.body.username}).then((result)=>{        //！！！！！这里本应该使用session查找，但是session暂时不会用就先用req.body！！！！！
        console.log(result)
        if(result.password==req.body.oldpassword){
          user.updateOne({ObjectId:result.ObjectId},{$set:req.body},function(err,result){
            if(err){
              res.send(err)//.sendStatus(400).end()
            }
            else{
              res.send('information has been modified')  //res.sendStatus(200).end()
            }
          })
        }
        else{res.send('wrong pwd')}
      })
    }      
    
    /*user.findOne({username:upData.username,password:upData.oldpassword}).then(()=>{
            if(flag){
              user.updateOne({username:upData.username,password:upData.oldpassword},{$set:upData}).then((result)=>{
                if (result.result.nModified === 1) {
                  res.status(200).end("update successful.")
              } else if (result.result.n === 1) {
                  res.status(200).end("no update performed");
              } else {
                  res.status(404).end('no such user')
              }
              })//此部分为Ctrl C， CTRL V来的，我还在学习中，但是功能已经实现，对更新数据的判断
              //同样的，用户存在？，密码原确？检查数据空？，这个操作会产生一个oldpassword的数据
          }
          
        })*/
      
    })

module.exports = router;
