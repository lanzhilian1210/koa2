const router = require('koa-router')();
const classInfo = require("../database/schema/classModel");
const jwt = require("jsonwebtoken");  //jwt 
let config = require('../config/configJWT'); //jwt 秘钥
router.prefix('/class')
router.get('/abc',async(ctx,next)=>{
    ctx.body = '213'
});
var exp = '';
router.post('/subInfo', async(ctx, next) => {
    let token = ctx.request.header.authorization;
    let newInfo = new classInfo(ctx.request.body);
    jwt.verify(token, config,{},(err,decoded)=>{
        // console.log(decoded.exp,Date.now());
        if(err) {
            console.log('过期了',1)
            ctx.body = {code:10011,message:'过期了'}
            exp = 1;
            return ;
        } 
        else if(decoded.exp*1000 < Date.now()) {
            console.log('过期了')
            ctx.body = {code:10010,message:'过期了'}  // token过期
            exp = 1;
            return ;
        } else {
            console.log('未过期',3)
            exp = 2;
            // ctx.body = {code:200,message:decoded.name,tip:'未过期'}
        }
    })
    if(exp == 2) {
        let newName = await newInfo.save();
        if(newName) {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        }
    } else {
        ctx.body = {code:10010,message:'token过期了'}  // token过期
    }
    
})
 

module.exports = router

