const express = require('express');
const router = express.Router();
const passport = require('passport');
const itArticle = require('../model/ITArticle');
const marked = require('marked')
// 文章列表
router.get('/ObtainList',passport.authenticate('jwt',{session:false}),(req,res)=>{
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
router.get('/ObtainList/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    itArticle.findOne({_id:req.params.id}).then(user=>{
        if(!user){
            return res.json("没有获取任何数据")
        }
        res.json({
            status:200,
            user
        });
    }).catch(err=>{
        res.status(404);
    })
})
// 添加文章接口
router.post('/addArticle',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log(req.body)
    const articleFileds = {};
    marked.setOptions({
        renderer:new marked.Renderer(),
        gfm:true,
        tables:true,
        breaks:true,
        pedantic:false,
        sanitize:false,
        smartLists:true,
        smartypants:false
    })
    if(req.body.title) articleFileds.title = req.body.title
    if(req.body.content) articleFileds.markdownArticle = req.body.content
    if(req.body.name) articleFileds.name = req.body.name
    if(req.body.author) articleFileds.author = req.body.author
    if(req.body.content) articleFileds.content = marked(req.body.content)
    if(req.body.imageUrl) articleFileds.imageUrl = req.body.imageUrl
    new itArticle(articleFileds).save()
                                .then(data=>{
                                    res.json({
                                        data,
                                        status:200
                                    })
                                }).catch(err=>{
                                    res.json({
                                       err,
                                       status:404
                                    })
                                })
})


// 修改文章接口
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const articleFileds = {};
    marked.setOptions({
        renderer:new marked.Renderer(),
        gfm:true,
        tables:true,
        breaks:true,
        pedantic:false,
        sanitize:false,
        smartLists:true,
        smartypants:false
    })
    if(req.body.title) articleFileds.title = req.body.title
    if(req.body.content) articleFileds.markdownArticle = req.body.content
    if(req.body.name) articleFileds.name = req.body.name
    if(req.body.author) articleFileds.author = req.body.author
    if(req.body.content) articleFileds.content = marked(req.body.content)
    if(req.body.imageUrl) articleFileds.imageUrl = req.body.imageUrl
    itArticle.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:articleFileds},
        {new:true}
    )
    .then(article=>{
        if(!article){
            return res.status(400).json('数据更改失败')
        }
        res.json({
            status:200,
            article
        })
    }).catch(err=>{
        res.json({
            status:400,
            err
        })
    })
})
// 删除文章接口
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    itArticle.findByIdAndDelete({_id:req.params.id})
            .then(del=>{
                res.json({
                    message:'刪除成功',
                    del,
                    status:200
                })
            }).catch(err=>{
                res.json({
                    message:'刪除失敗',
                    err,
                    status:400
                })
            })
})



module.exports = router
