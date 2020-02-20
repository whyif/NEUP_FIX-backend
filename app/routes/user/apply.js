//调试了请求写入数据库与查看个人预约部分，去掉注释可对接
//修改了查看个人预约的api，但尚未联系前端
//想了一下，也许可以用数据库分配的objectID来作为各种id（维修id，个人ID等等）
const express = require('express');
const router = express.Router();

const NEUfix= require('../../db/client.js').db('myproject');
const list=NEUfix.collection('list')

console.log('router apply has loaded')


router.post('/',function(req,res){
    let Data=req.body
    var flag=true

    for(let i in Data){
        if(!Data[i]){
            flag=false
        }
    }
    if(flag){
        list.insertOne({
        //username:req.session.username,
        username:req.body.username,    
        apply:{
            device_type:req.body.device_type,
            device_model:req.body.device_model,
            description:req.body.description,
            contact:req.body.contact,
            time:new Date(),
            connecttime:req.body.connecttime,
            site:req.body.site
        },
        accept:{
            applyid:"",        //系统自动分配唯一申请id
            status:"预约成功",
            description:'',
            member:"",
            confire_site:"",
            confire_time:""
        }
        },function(err){
            if(err!=null){
                res.send(err)//res.status(400).end()
            }else{
                res.send('apply successfully')
                //res.status(200).end()
                //req.session.username=req.body.username
                //res.redirect('/home')
                //注册成功自动建立会话，并重定向到/home
            }
        })
    }else{
      //res.status(405).end()
      res.send('user existed or some null error')
    }
    
})
router.get('/',function(req,res,next){
    res.render('../views/apply')
})

router.get('/search/:username',function(req,res){       //查看个人预约
    /*list.find({username:req.params.username}).toArray().then((result)=>{
        if(result===null){
            res.send('no apply can be found')//res.status(400).end()
        }else{
            console.log(result)//res.json(data).status(200).end()
            res.send("founded")
        }
    })*/
    list.find({username:req.params.username}).toArray().then((result)=>{
        if (result.length!=0){           
            console.log(result)
            res.send('founded')}
        else{
            res.send('no apply can be found')           
        }
    })        
})

router.post('/apply/:applyid',function(req,res){      //修改维修请求
list.updateOne({applyid:req.params.applyid},{$set:req.body},function(err,result){
    if(err==null){res.sendStatus(200).end()}
    else{res.sendStatus(405).end()}
})
})

module.exports=router;