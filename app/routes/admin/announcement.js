const express = require('express');
const router = express.Router();

const NEUfix= require('../../db/client').db('NEU_fix');
const announcement =NEUfix.collection('announcement')
//const announcement=require('../../db/client').announcement;


router.post('/announcement',function(req,res){     //发布公告
    announcement.insertOne({
        time:new Date(),
        text:req.body.text,
        publicid:req.body.publicid ,  //发布人
        announcementid:req.body.announcementid  //公告id，用于查找公告，联系前段
    },function(err){
        if (err!=null){
            res.sendStatus(405).end()
        }else{
            res.sendStatus(200).end()
        }
    })
})

router.get('/announcement',function(req,res){    //查看所有公告
    announcement.find({}).toArray().then((result)=>{
        if(result==null){
            res.status(404).end()
        }else{
            console.log(result)//res.status(200).json(result).end()
        }
    })
})

router.put('/announcement/:announcementid',function(req,res){     //修改公告
    announcement.updateOne({announcementid:req.query.announcementid},{$set:req.body},function(err){
        if(err){res.sendStatus(405).end()}
        else{res.sendStatus(200).end()}
    })
})


module.exports=router;