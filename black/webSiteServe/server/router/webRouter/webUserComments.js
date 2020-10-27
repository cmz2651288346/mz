const express = require('express')
const router = express.Router()
const userComments = require('../../model/UserComments')
const passport = require('passport');

router.post('usermessageEdit/:id',(req,res)=>{
    let dataCollection = {};
    if(req.body.read) dataCollection.username = req.body.username
    if(req.body.read) dataCollection.read = req.body.read
    if(req.body.content) dataCollection.content = req.body.content
    userComments.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:dataCollection},
        {new:true}
    ).then(data=>{
        if(data){
            res.json({
                data,
                status:200
            })
        }
    }).catch(error=>{
        res.json({
            error,
            status:400
        })
    })
})

module.exports = router