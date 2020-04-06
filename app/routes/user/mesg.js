const express = require('express');
const router = express.Router();


const NEUfix= require('../../db/client').db('myproject');
const mesg=NEUfix.collection('mesg')
const list=NEUfix.collection('list')

router.get('/',function(req,res){
    list.find({username:req.session.username}).toArray().then((result)=>{
        //console.log(result)
        res.render('mesg',{data:result})
    })
    
})

router.get('/:applyid',function(req,res){      //查看具体评价      !!!!!!!!!!!!!!!4.6号因失误被修改，记得改回来!!!!!!!!!!!!!!!!!!!!
    mesg.find({_id:req.query.applyid}).toArray().then((result)=>{
        if (result==null){
            res.send("")
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

router.post('/',function(req,res){     //写评价
    mesg.insertOne({
        time:new Date(),
        username:req.session.username,  
        userid:req.session.userid,    //session需要修改，因为当前版本session不含userid
        content:req.body.content, 
        applyid:"",    //后端自动记录
        mesgid:""   
    },function(err){
        if(err!=null){res.status(405).end()}
        else{res.status(200).end()}
    })   
})

router.put('/:applyid',function(req,res){      //修改留言
    mesg.updateOne({mesgid:req.params.mesgid},{$set:req.body},function(err){
        if(err==null){res.sendStatus(200).end()}
        else{res.sendStatus(405).end()}
    })
})

router.delete('/:applyid',function(req,res){    //删除留言
    mesg.deleteOne({mesgid:req.params.mesgid},function(err){
        if(err==null){res.sendStatus(200).end()}
        else{res.sendStatus(405).end()}
    })
})
module.exports=router;