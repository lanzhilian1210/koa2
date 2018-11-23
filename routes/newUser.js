const router = require('koa-router')();
const newUserInfo = require("../database/schema/newUserModel");
const session = require('koa-session');
router.prefix('/newUser')
router.get('/abc',async(ctx,next)=>{
    ctx.body = '213'
});
// 注册
router.post('/signUp', async(ctx,err) => {
    
    ctx.session.name = '123';
    console.log(ctx.session);
    let newUser = new newUserInfo(ctx.request.body);
    let newUserName = newUser.userName;
    let findOldUser = await newUserInfo.findOne({'userName':newUserName});
    if(findOldUser && findOldUser != null) {
        ctx.body = {
            code: 1,
            message: '该用户已被注册'
        }
        return ;
    };
    let userInfoName = await newUser.save();
    if(userInfoName) {
        ctx.body = {
            code: 2,
            message: '该用户成功注册'
        }
        return ;
    } else {
        ctx.body = {
            code: 0,
            message: '该用户注册失败'
        }
        return ;
    }

})

router.get('/sess',async(ctx,err)=>{
    ctx.body = 123;
    console.log(ctx.session,'ss');
})


module.exports = router
