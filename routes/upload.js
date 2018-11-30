const router = require('koa-router')();
const multer = require('koa-multer');
const send = require('koa-send');
router.prefix('/upload');

router.get('/abc',async(ctx,next)=>{
    ctx.body = '213'
});
const storage = multer.diskStorage({
    destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
    filename(ctx,file,cb){
      const filenameArr = file.originalname.split('.');
      cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
    }
  });
// 上传
const upload = multer({storage});
router.post('/file', upload.single('file'),(ctx)=> {
console.log(ctx.req.file);
ctx.req.file.filename = ctx.req.file.originalname;
ctx.body = {
    fileName:ctx.req.file.filename
    };
});


module.exports = router