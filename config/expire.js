// 验证过期
const jwt = require("jsonwebtoken");  //jwt 
let config = require('./configJWT'); //jwt 秘钥

function expireFn(token,ctx){
    jwt.verify(token, config,{},(err,decoded)=>{
        // console.log(decoded.exp,Date.now());
        if(err) {
            console.log('过期了',1)
            ctx.body = {code:10011,message:'过期了'}
            return ;
        } 
        else if(decoded.exp*1000 < Date.now()) {
            console.log('过期了')
            ctx.body = {code:10010,message:'过期了'}  // token过期
        } else {
            console.log('未过期',3)
            ctx.body = {code:200,message:decoded.name,tip:'未过期'}
        }
    })
}
module.exports = expireFn;
