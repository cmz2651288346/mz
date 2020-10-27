const express = require('express');
const router = express.Router();
const passport = require('passport');
const dayNote = require('../model/DayNote');
const marked = require('marked')
// 查询其他文章列表
router.get('/dayNoteList',passport.authenticate('jwt',{session:false}),(req,res)=>{
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

router.get('/dayNoteList/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let id = req.params.id;
    dayNote.findOne({_id:id}).then(data=>{
        res.json({
            status:200,
            data
        })
        }).catch(err=>{
            res.json({
                err,
                status:400
            })
        })
    })


router.post('/addDayNote',passport.authenticate('jwt',{session:false}),(req,res)=>{
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
    dayNote(dataCollection).save().then(data=>{
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

router.post('/editDayNote/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
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
    dayNote.findByIdAndUpdate(
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


router.delete('/delteDayNote/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let id = req.params.id;
    dayNote.deleteOne({_id:id}).then(data=>{
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