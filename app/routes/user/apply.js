//仅仅调试了请求写入数据库的部分
const express = require('express');
const router = express.Router();

const NEUfix= require('../../db/client.js').db('NEU_fix');
const list=NEUfix.collection('list')

console.log('router apply has loaded')


router.post('/',function(req,res){
    console.log(req.body)
    let Data=req.body
    var flag=true

    for(let i in Data){
        if(!Data[i]||Data.username!==req.session.username){
            flag=false
        }
    }
    if(flag){
        list.insertOne({
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
                
            }
        })
    }else{
     
      res.send('user existed or some null error')
    }
    
})


router.get('/',function(req,res){       //查看个人预约
    list.find({username:req.query.username}).toArray().then((result)=>{
        if(result==null){
            res.status(400).end()
        }else{
            let data ={
                apply:{
                    device_type:result.apply.device_type,
                    device_model:result.apply.device_model,
                    time:result.apply.time,
                    description:result.apply.description,
                    contact:result.apply.contact,
                    connecttime:result.apply.connecttime,
                    site:result.apply.site
                },
                accept:{
                    applyid:result.accept.applyid,
                    status:result.accept.status,
                    description:result.accept.description,
                    member:result.accept.member,
                    confire_site:result.accept.confire_site,
                    comfire_time:result.accept.confire_time
                }
            }
            console.log(data)//res.json(data).status(200).end()
        }
    })        
})

router.put('/apply/:userid',function(req,res){      //修改维修请求
list.updateOne({applyid:req.params.accept.applyid},{$set:req.body},function(err,result){
    if(err==null){res.sendStatus(200).end()}
    else{res.sendStatus(405).end()}
})
})

module.exports=router;