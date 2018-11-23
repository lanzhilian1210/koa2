// user 表格模型
const mongoose = require('mongoose');    //引入Mongoose
const Schema = mongoose.Schema;         //声明Schema
let ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcrypt'); 
const SALT_WORK_FACTOR = 10;
//创建我们的xin用户Schema
const newUserSchema = new Schema({
    UserId: ObjectId,
    userName:{type:String,unique:true},
    password: String,
    createAt: {type:Date,default:Date.now()},
    lastLoginAt: {type:Date,default:Date.now()}
});

// 加密
newUserSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
});

newUserSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
//发布模型
const model = mongoose.model('newUserInfo',newUserSchema);

module.exports = model;