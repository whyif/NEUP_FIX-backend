const express = require('express');
const router = express.Router();


const NEUfix= require('../../db/client').db('NEU_fix');
const mesg=NEUfix.collection('mesg')
//const mesg=require('../../db/client').mesg;
router.get('/mesg/:applyid',function(req,res){      //查看所有评价      ????????只能查找一个评价，如何查看所有评价??????
    mesg.find({applyid:req.query.applyid}).toArray().then((result)=>{
        if (result==null){
            res.status(400).end()
        }else{
            let data={
                username:result.username,
                content:result.username,
                applyid:result.applyid,
                time:result.time
            }
            res.json(data).status(200).end()
        }
    })
})

router.post('/mesg/:applyid',function(req,res){     //写评价
    mesg.insertOne({
        time:new Date(),
        username:"", //！！！！！！！！！！！后端自动记录，需要修改！！！！！！！！！  
        userid:"",
        content:req.body.content, 
        applyid:"",    //后端自动记录
        mesgid:""   
    },function(err){
        if(err!=null){res.status(405).end()}
        else{res.status(200).end()}
    })   
})

router.put('/mesg/:applyid',function(req,res){      //修改留言
    mesg.updateOne({mesgid:req.params.mesgid},{$set:req.body},function(err){
        if(err==null){res.sendStatus(200).end()}
        else{res.sendStatus(405).end()}
    })
})

router.delete('/mesg/:applyid',function(req,res){    //删除留言
    mesg.deleteOne({mesgid:req.params.mesgid},function(err){
        if(err==null){res.sendStatus(200).end()}
        else{res.sendStatus(405).end()}
    })
})
module.exports=router;