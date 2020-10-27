const express = require('express')
const router = express.Router()
const userComments = require('../model/UserComments')
const passport = require('passport');
router.get('/usermessage',passport.authenticate('jwt',{session:false}),(req,res)=>{
    userComments.find({}).then(data=>{
        if(data){
            res.json({
                status:200,
                data
            })
        }
    }).catch(error=>{
        res.json({
            status:400,
            error
        })
    })
})
router.get('/usermessage/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    userComments.findOne({_id:req.params.id}).then(data=>{
            res.json({
                status:200,
                data
            })
    }).catch(error=>{
        res.json({
            status:400,
            error
        })
    })
})

router.post('usermessageEdit/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
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