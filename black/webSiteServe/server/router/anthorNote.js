const express = require('express');
const router = express.Router();
//加载模块dayNote
const anthorNote = require('../model/AnthorNote');
const passport = require('passport');
const marked = require('marked')
// 获取所有文章
router.get('/anthorNoteList',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let query = req.query;
    if(query.pageNo == ''){
        query.pageNo = 1
    }else{
        query.pageNo = query.pageNo
    }
    anthorNote.countDocuments({}, (error, count) => {
        if (error) {
            logger.error(`user::/list::error:${JSON.stringify(error)}`);
            res.json({
                status: 400,
                msg: JSON.stringify(error)
            });
        } else {
            anthorNote.find({}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||20) .sort({ 'created': -1 }).exec((err, doc) => {
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
router.get('/anthorNoteList/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    anthorNote.findOne({_id:req.params.id}).then(data=>{
        if(data){
            res.json({
                data,
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
// 文章添加
router.post('/anthorNoteAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let dataCollection = {};
    console.log(req.body)
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
    if(req.body.title) dataCollection.title = req.body.title
    if(req.body.content) dataCollection.markdownArticle = req.body.content
    if(req.body.author) dataCollection.author = req.body.author
    if(req.body.content) dataCollection.content = marked(req.body.content)
    anthorNote(dataCollection).save().then(data=>{
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
// 文章修改
router.post('/editAnthorNote/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let id = req.params.id;
    let dataCollection = {};
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
    if(req.body.title) dataCollection.title = req.body.title
    if(req.body.content) dataCollection.markdownArticle = req.body.content
    if(req.body.author) dataCollection.author = req.body.author
    if(req.body.content) dataCollection.content = marked(req.body.content)
    anthorNote.findByIdAndUpdate(
        {_id:id},
        {$set:dataCollection},
        {new:true}
    ).then(data=>{
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

// 删除对应文章
router.delete('/delteAnthorNote/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let id = req.params.id;
    anthorNote.deleteOne({_id:id}).then(data=>{
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


module.exports = router