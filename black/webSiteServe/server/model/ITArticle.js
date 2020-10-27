const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
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


module.exports = ITArticle = mongoose.model('ITArticle',articleSchema)