const router = require('koa-router')();
const studentInfo = require("../database/schema/studentModel");
const classInfo = require("../database/schema/classModel");
router.prefix('/student')
router.get('/abc',async(ctx,next)=>{
    ctx.body = '213'
});

router.post('/getInfo', async(ctx, next) => {
    let student = new studentInfo(ctx.request.body); 
    student.calssId = "5bf67f5e63c5cf2410417ee1";  // 联查时保存class对应的id
    let studentName = await student.save();
    if(studentName) {
        ctx.body = {
            code: 200,
            message: 'success'
        }
    }
})

router.get('/getListInfo', async(ctx, next) => {
    let res = await studentInfo.find().populate('calssId');
    if(res) {
        ctx.body = {
            class:res,
            code: 200,
            message: '获取信息成功'
        }
    }
})
 

module.exports = router

