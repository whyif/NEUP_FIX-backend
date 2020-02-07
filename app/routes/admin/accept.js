const express = require('express');
const router = express.Router();

const NEUfix= require('../../db/client').db('NEU_fix');
const list=NEUfix.collection('list')
//const list=require('../../db/client').list;

router.get('/accept',function(req,res){
    console.log('accept page')
})

router.post('/accept',function(req,res){    
    list.updateOne({applyid:req.params.accept.applyid},{
        $set:
        {
           accept:{
           status:"已接受维修请求",
           member:req.body.member,
           confire_site:req.body.confire_site,
           confire_time:req.body.confire_time
        }
    }
    },function(err){
        if (err==null){res.sendStatus(200).end()}
        else{res.sendStatus(405).end()}
    })             //暂时使用post请求，可改进
})


module.exports=router;