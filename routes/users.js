const router = require('koa-router')();
const userInfo = require("../database/schema/userModel");
const jwt = require("jsonwebtoken");  //jwt 
let config = require('../config/configJWT'); //jwt 秘钥
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
        let token = jwt.sign({name: userName}, config, {
            expiresIn:60*60
          });
        // console.log(token);
        ctx.body = {code:200,message:isMatch,objId:findUser._id,token:token};
    }).catch(err=>{
        ctx.body = {code:500,message:err};
    })
});
router.post('/status', async(ctx,next) => {
    let token = ctx.request.header.authorization.split('Bearer ')[1];
    jwt.verify(token, config,{},(err,decoded)=>{
        
        console.log(decoded.exp,Date.now());
        if(err) {
            ctx.body = {code:10011,message:'过期了'}
        } 
        else if(decoded.exp*100 < Date.now()) {
            ctx.body = {code:10010,message:'过期了'}  // token过期
        } else {
            ctx.body = {code:200,message:decoded.name}
        }
    })
})

module.exports = router
