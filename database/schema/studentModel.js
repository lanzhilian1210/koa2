// student 表格模型
const mongoose = require('mongoose');    //引入Mongoose
const Schema = mongoose.Schema;         //声明Schema
let ObjectId = Schema.Types.ObjectId;


var StudentSchema = new mongoose.Schema({
    name: String,
    calssId: {
        type: ObjectId,
        ref: 'classInfo'
    },
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
const model = mongoose.model('studentInfo',StudentSchema);

module.exports = model;