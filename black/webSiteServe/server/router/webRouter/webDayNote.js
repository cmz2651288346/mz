const express = require('express');
const router = express.Router();
const dayNote = require('../../model/DayNote');
// 查询其他文章列表
router.get('/dayNoteList',(req,res)=>{
    let query = req.query;
    if(query.pageNo == ''){
        query.pageNo = 1
    }else{
        query.pageNo = query.pageNo
    }
    dayNote.countDocuments({}, (error, count) => {
        if (error) {
            logger.error(`user::/list::error:${JSON.stringify(error)}`);
            res.json({
                status: 400,
                msg: JSON.stringify(error)
            });
        } else {
            dayNote.find({}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||20) .sort({ 'created': -1 }).exec((err, doc) => {
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

router.get('/dayNoteList/:id',(req,res)=>{
    let id = req.params.id;
    let readNum = {};
    if(req.params.read) readNum.read = req.params.read
    dayNote.findOne({_id:id}).then(data=>{
        if(data){
            // 查看阅读数量
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
                data
            })
        }
        }).catch(err=>{
            res.json({
                err,
                status:400
            })
        })
    })


module.exports = router