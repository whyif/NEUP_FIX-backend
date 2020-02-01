const express = require('express');
const router = express.Router();

const NEUfix= require('../../db/client.js/index.js').db('NEU_fix');
const list=NEUfix.collection('list')



router.get('/apply',function(req,res){
    res.render('apply page')
})
router.post('/apply',function(req,res){     //维修申请表                 
    list.insertOne({
        username:"",    //？？？？？？？？？？？？？？从登录信息直接导入？？？？？？？？？？？？,便于查找
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
            description:req.body.description,
            menber:"",
            confire_site:"",
            comfire_time:""
        }
    },function(err){
        if (err!=null){res.sendStatus(400).end()}
        else{res.sendStatus(200).end()}
    })
})

router.get('/apply/:userid',function(req,res){       //查看个人预约
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
            res.json(data).status(200).end()
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