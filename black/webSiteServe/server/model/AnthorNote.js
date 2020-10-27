const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const anthorNoterSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
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
    image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    read:{
        type:String,
    }
})

module.exports = AnthorNote = mongoose.model('AnthorNote',anthorNoterSchema);