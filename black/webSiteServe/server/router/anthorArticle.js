const express = require('express');
const router = express.Router();
const passport = require('passport');
const anthorArticle = require('../model/AnthorArticle');
const marked = require('marked')
// 查询其他文章列表
router.get('/anthorArticle',passport.authenticate('jwt',{session:false}),(req,res)=>{
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
    anthorArticle.findOne({_id:req.params.id}).then(details=>{
        if(details){
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

//其他文章添加接口 
router.post('/anthorArticleAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
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
    anthorArticle(articleFileds).save()
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

// 其他文章修改接口
router.post('/anthorArticleEdit/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
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
        anthorArticle.findByIdAndUpdate(
            {_id:req.params.id},
            {$set:articleFileds},//修改接口
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
})

// 其他文章删除接口
router.delete('/anthorDelete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    anthorArticle.findOneAndDelete({_id:req.params.id})
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

module.exports = router;