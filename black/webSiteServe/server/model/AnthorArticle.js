const express = require('express');
const mongose = require('mongoose');
const AnthorArticleSchema = new mongose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    markdownArticle:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    name:{
        type:String,
    },
    read:{
        type:String
    }
})

module.exports = AnthorArticle = mongose.model('AnthorArticle',AnthorArticleSchema);