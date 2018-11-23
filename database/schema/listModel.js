// user 表格模型
const mongoose = require('mongoose');    //引入Mongoose
const Schema = mongoose.Schema;         //声明Schema
let ObjectId = Schema.Types.ObjectId;
//创建列表list Schema
const listSchema = new Schema({
    textId: {type:ObjectId,ref:'userModel'},
    text: {type:String,ref:'userModel'},
    createAt: {type:Date,default:Date.now()},
    lastLoginAt: {type:Date,default:Date.now()}
});

//发布模型
const model = mongoose.model('listInfo',listSchema);

module.exports = model;