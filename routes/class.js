const router = require('koa-router')();
const classInfo = require("../database/schema/classModel");
router.prefix('/class')
router.get('/abc',async(ctx,next)=>{
    ctx.body = '213'
});

router.post('/subInfo', async(ctx, next) => {
    let newInfo = new classInfo(ctx.request.body);
    let newName = await newInfo.save();
    if(newName) {
        ctx.body = {
            code: 200,
            message: 'success'
        }
    }
})
 

module.exports = router

