const express = require('express');
const router = express.Router();
const takeUserIp = require('../model/TakeUserIp')
const passport = require('passport');
router.get('/getUserIpList',passport.authenticate('jwt',{session:false}),(req,res)=>{
    takeUserIp.find({}).then(data=>{
        res.json({
            data,
            msg:'目前为止所有IP'
        })
    }).catch(error=>{
        res.json({
            error,
            msg:'获取数据库所有IP失败'
        })
    })
})
module.exports = router