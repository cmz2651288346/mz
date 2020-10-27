const express = require('express');
const router = express.Router();
const takeUserIp = require('../../model/TakeUserIp')

//通过req的hearers来获取客户端ip
const getIp = function(req) {
    var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0];
    }
    return ip;
};
//发送请求，获取客户端ip
router.get('/getUserIp',(req,res)=>{
    var clientIp = getIp(req)
    let userIp = {}
    if(clientIp) userIp.UserIp = clientIp
    takeUserIp.findOne({UserIp:clientIp}).then(data=>{
            if(data){
                return res.json({
                    msg:'该ip已存在数据库',
                })
            }
            new takeUserIp(userIp).save().then(result=>{
                res.json({
                    message:'您的本地ip以存储成功',
                    status:200,
                    result
                })
            }).catch(err=>{
                res.json({
                    message:'您的本地ip以存储失败',
                    err,
                    status:400
                })
            })
        }).catch(error=>{
            res.json({
                msg:'数据查找失败',
                error
            })
        })
})
router.get('/getUserIpList',(req,res)=>{
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