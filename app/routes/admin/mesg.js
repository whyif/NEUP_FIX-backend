const express = require('express');
const router = express.Router();
const NEUfix= require('../../db/client').db('NEU_fix');
const mesg=NEUfix.collection('mesg')

router.get('/:applyid/mesg',function(req,res){
    mesg.findOne({mesgid:req.query.mesgid}).then((result)=>{
        if (result!=null){res.json(result).sendStatus(200).end()}
        else{res.sendStatus(400).end()}
    })
})
    
module.exports=router;