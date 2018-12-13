// student 表格模型
const mongoose = require('mongoose');    //引入Mongoose
const Schema = mongoose.Schema;         //声明Schema
var classSchema = new mongoose.Schema({
    title: String,
    content: String,
    objId:String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
    /*更新时间的*/
});

//发布模型
const model = mongoose.model('classInfo',classSchema);

module.exports = model;