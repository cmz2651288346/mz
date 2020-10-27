const express = require('express');
const router = express.Router();
const itArticle = require('../../model/ITArticle');
// 文章列表
router.get('/ObtainList',(req,res)=>{
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    let query = req.query;
    if(query.pageNo == ''){
        query.pageNo = 1
    }else{
        query.pageNo = query.pageNo
    }
    itArticle.countDocuments({}, (error, count) => {
        if (error) {
            logger.error(`user::/list::error:${JSON.stringify(error)}`);
            res.json({
                status: 400,
                msg: JSON.stringify(error)
            });
        } else {
            itArticle.find({}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||20).sort({ date:'desc' }).exec((err, doc) => {
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
// 详情页接口
router.get('/ObtainList/:id',(req,res)=>{
    //允许的header类型
    let readNum = {};
    if(req.params.read) readNum.read = req.params.read
    itArticle.findOne({_id:req.params.id}).then(user=>{
        if(!user){
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
                status:200,
                user
            });
        }
    }).catch(err=>{
        res.status(404);
    })
})


module.exports = router
