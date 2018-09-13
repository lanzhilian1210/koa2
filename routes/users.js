const router = require('koa-router')();
const mongoose = require('mongoose');
const userInfo = require("../database/schema/userModel");
var jwt = require("jsonwebtoken");  //jwt 
router.prefix('/users')

router.post('/reg', async(ctx, next) => {
    let newUser = new userInfo(ctx.request.body);
    let userName = ctx.request.body.userName;
    let findUser = await userInfo.findOne({userName:userName});
    if(findUser && findUser != null) {
        ctx.body = {
            code: 500,
            message: '该用户已被注册'
        }
        return ;
    };
    await newUser.save().then(()=>{
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            message: err
        }
    })
})

router.post('/login',async(ctx)=>{
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;
    let findUser = await userInfo.findOne({userName:userName}).exec();
    if(findUser == null) {
        ctx.body = {
            code:500,
            message:'账户不存在'
        };
        return ;
    };
    let newUser = new userInfo();
    await newUser.comparePassword(password,findUser.password).then(isMatch=>{
        // ctx.session.username = "张三";
        // console.log(ctx.session.username);
        let token = jwt.sign({ _id: user._id }, config.secrets.session, {
            expiresIn: 60 * 60 * 5
            });
        ctx.body = {code:200,message:isMatch,objId:findUser._id};
    }).catch(err=>{
        ctx.body = {code:500,message:err};
    })
})

module.exports = router
