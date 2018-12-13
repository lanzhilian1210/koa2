const router = require('koa-router')();
var officegen = require('officegen');  //生成word
var extract = require('pdf-text-extract')   // pdf 读取
var iconv = require('iconv-lite');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../public/uploads/2018123/1.txt');
var fileStr = fs.readFileSync(filePath, {encoding:'binary'});
var buf = new Buffer(fileStr, 'binary');
var str = iconv.decode(buf, 'GBK');
// console.log(str);
  // extract(filePath, function (err, pages) {
  //   if (err) {
  //     console.dir(err,3)
  //     return
  //   }
  //   console.dir(pages,4)
  // })

//   生成docx
var docx = officegen ({
    'type': 'docx'
});
router.prefix('/download');
// 监听文档完成
docx.on ( 'finalize', function ( written ) {
    console.log ( written );
});
// 监听文档错误
docx.on ( 'error', function ( err ) {
    console.log ( err );
});

// 下载
router.get('/file',(ctx)=> {
    ctx.set('Content-Type','application/vnd.openxmlformats-officedocument.presentationml.presentation',)
    ctx.set('Content-disposition','attachment; filename=surprise.docx')
    ctx.body = str;
});


module.exports = router