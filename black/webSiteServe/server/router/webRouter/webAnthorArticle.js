const express = require('express');
const router = express.Router();
const passport = require('passport');
const anthorArticle = require('../../model/AnthorArticle');
const marked = require('marked')
// 查询其他文章列表
router.get('/anthorArticle',(req,res)=>{
    let query = req.query;
    if(query.pageNo == ''){
        query.pageNo = 1
    }else{
        query.pageNo = query.pageNo
    }
    anthorArticle.countDocuments({}, (error, count) => {
        if (error) {
            logger.error(`user::/list::error:${JSON.stringify(error)}`);
            res.json({
                status: 400,
                msg: JSON.stringify(error)
            });
        } else {
            anthorArticle.find({}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||20) .sort({ 'created': -1 }).exec((err, doc) => {
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

//通过id查询该文章详情页
router.get('/anthorArticleDetails/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let readNum = {};
    if(req.params.read) readNum.read = req.params.read
    anthorArticle.findOne({_id:req.params.id}).then(details=>{
        if(details){
            anthorArticle.findByIdAndUpdate(
                {_id:req.params.id},
                {$set:readNum},//修改接口
                {new:true}
            ).then(anthorArticle=>{
                res.json({
                    status:200,
                    anthorArticle
                })
            }).catch(err=>{
                res.json({
                    status:400,
                    err
                })
            })
            res.json({
                details,
                status:200
            })
        }
    }).catch(err=>{
        res.json({
            err,
            status:400
        })
    })
})

module.exports = router;