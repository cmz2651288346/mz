let express = require('express');
let router = express.Router();
let passport = require('passport');
let userSuggest = require('../model/UserSuggest');

// 分页获取所有反馈
router.get('/suggestList',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let query = req.query;
    if(query.pageNo == ''){
        query.pageNo = 1
    }else{
        query.pageNo = query.pageNo
    }
    userSuggest.countDocuments({}, (error, count) => {
        if (error) {
            logger.error(`user::/list::error:${JSON.stringify(error)}`);
            res.json({
                status: 400,
                msg: JSON.stringify(error)
            });
        } else {
            userSuggest.find({}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||20) .sort({ 'created': -1 }).exec((err, doc) => {
                if (err) {
                    logger.error(`user::/list::err:${JSON.stringify(err)}`);
                    res.json({
                        status: 400,
                        msg: JSON.stringify(err)
                    });
                } else {
                    res.json({
                        status: 200,
                        result: doc,
                        total: count,
                        msg:'OK'
                    });
                }
            })
        }
    })
})

// 获取id根据id查询相关详情页
router.get('/suggestList:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let id = req.params.id;
    userSuggest.find({_id:id})
                .then(data=>{
                    res.json({
                        data,
                        status:200
                    })
                }).catch(err=>{
                    res.json({
                        err,
                        status:400
                    })
                })
})

// 反馈信息回复

// 前端添加反馈信息
router.post('/addSuggest',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let storeSuggest = {}
    if(req.query.username) storeSuggest.username = req.query.username;
    if(req.query.suggestMessage) storeSuggest.suggestMessage = req.query.suggestMessage
    userSuggest(storeSuggest).save()
                              .then(data=>{
                                  res.json({
                                      data,
                                      status:200
                                  })
                              })
                              .catch(err=>{
                                  res.json({
                                      err,
                                      status:400
                                  })
                              })
})

router.delete('/deleteSuggest:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let id = req.params.id;
    userSuggest.findOneAndDelete({_id:id})
                .then(data=>{
                    res.json({
                        data,
                        status:200
                    })
                })
                .catch(err=>{
                    res.json({
                        err,
                        status:400
                    })
                })
})

module.exports = router;