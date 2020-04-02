const express = require('express');
const router = express.Router();


    const NEUfix= require('../../db/client').db('myproject')
    const mesg=NEUfix.collection('mesg')
    router.get('/:applyid',function(req,res){ 
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

module.exports=router;