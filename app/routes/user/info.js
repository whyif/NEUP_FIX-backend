const express = require('express');
const router = express.Router();
const NEUfix=require('../../db/client').db('NEU_fix')
const user=NEUfix.collection('user')

const NEUfix= require('../../db/client').db('NEU_fix');
const user =NEUfix.collection('user')
/*更新数据要提交到库，故还是要 连接数据库 */

router.get('/info',function(req,res){
<<<<<<< HEAD
  user.findOne({userid:req.session.userid}).then((reslut)=>{
    if(reslut==null){res.sendStatus(405).end()}
    else{res.sendStatus(200).json(reslut).end()}
  })
  //res.send(req.session.username+'your page')
=======
  
  res.render('userInfo')
>>>>>>> 5f4dcd8e291be07bf1bc7c1fe6570ad15b544c03
})
/*get请求渲染页面，post时更新数据到数据库 */

router.post('/info',function(req,res){
      if(req.session.username){
        let upData=req.body
        let flag=true

        for(let i in upData){//判断数据是否有空
          if(!upData[i]){
              flag=false
          }

          user.findOne({username:upData.username,password:upData.oldpassword}).then(()=>{
            if(flag){
              user.updateOne({username:upData.username},{$set:upData}).then((result)=>{
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
          
        })
      }
    }
})

/*
由于实验目的需要暂时写成这样，到时候会恢复，
同理对会话的验证，以及对于修改后的数据的检查，
最后，暂时不清楚put方法是怎么实现的故暂时用post进行处理
对数据的更改，
*/

<<<<<<< HEAD
/*router.get('/info/:userid', function(req, res) {
  console.log('userInfo page')
  res.render('userInfo')
})*/            //个人觉得只需要用session就够了，毕竟要先登录再看个人信息
=======





/*
实验战略注释
router.get('/info/:userid', function(req, res) {
  console.log('userInfo page')
  res.render('userInfo')
})
*/
>>>>>>> 5f4dcd8e291be07bf1bc7c1fe6570ad15b544c03

//修改个人信息
/*鉴于测试目的暂时将这些代码注释
router.put('/info/:userid',function(req,res){
<<<<<<< HEAD
  user.updateOne({userid:req.query.userid},{$set:req.body},function(err,reslut){
    if(reslut==null){res.sendStatus(400).end()}
    else{
      if(err){res.sendStatus(405).end()}
      else{res.sendStatus(200).end()}
    }
  })
=======

>>>>>>> 5f4dcd8e291be07bf1bc7c1fe6570ad15b544c03
  console.log('userinfo change')
})

*/

module.exports = router;
