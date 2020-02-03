const express = require('express');
const router = express.Router();

const NEUfix= require('../../db/client').db('NEU_fix');
const list=NEUfix.collection('list')
//const list=require('../../db/client').list;

router.get('/accept',function(req,res){
    console.log('accept page')
})

router.put('/accept',function(req,res){    
    list.updateOne({applyid:req.params.accept.applyid},{status:"预约成功"},function(err){
        if (err==null){res.sendStatus(200).end()}
        else{res.sendStatus(405).end()}
    })             //!!!!!!!!!!!!可能存在隐形的问题，学习更新数据!!!!!!!!!!!!!!!!!!!!!!!
})


module.exports=router;