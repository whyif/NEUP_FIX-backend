//调试成功,为了简便不再采用userID的方法，转而使用了简单粗暴的username查找。后期可修改

const express = require('express');
const router = express.Router();
const NEUfix=require('../../db/client').db('myproject')
const user=NEUfix.collection('user')



router.get('/',function(req,res){
  user.findOne({username:req.session.username}).then((result)=>{
    if(result==null){
      res.send('user not found')//res.sendStatus(405).end()
    }
    else{
      console.log(result)//res.sendStatus(200).json(reslut).end()
      res.render('userinfo')
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
      user.findOne({username:req.session.username}).then((result)=>{        //！！！！！这里本应该使用session查找，但是session暂时不会用就先用req.body！！！！！
        console.log(result)
        if(result.password==req.body.oldpassword){
          user.updateOne({username:req.session.username},{$set:req.body},function(err,result){
            if(err){
              res.send(err)//.sendStatus(400).end()
            }
            else{
              console.log('information has been modified '+req.body.username)  //res.sendStatus(200).end()
              req.session.username=req.body.username
              res.redirect('/home')
            }
          })
        }
        else{res.send('wrong pwd')}
      })
    }      
    
      
    })

module.exports = router;
