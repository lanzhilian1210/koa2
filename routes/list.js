const router = require('koa-router')();
const listInfo = require("../database/schema/listModel");
router.prefix('/admin')
router.get('/abc',async(ctx,next)=>{
    ctx.body = '213'
});

router.post('/subInfo', async(ctx, next) => {
    let newInfo = new listInfo(ctx.request.body);
    await newInfo.save().then(()=>{
        ctx.body = {
            code: 200,
            message: '获取信息成功'
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            message: '获取信息失败'
        }
    })
})
router.get('/getInfo', async(ctx, next) => {
    await listInfo.find().populate('userName').then((res)=>{
        console.log(res)
        ctx.body = {
            list:res,
            code: 200,
            message: '获取信息成功'
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            message: '获取信息失败'
        }
    })
})
 

module.exports = router

