const router = require('koa-router')();
var officegen = require('officegen');  //生成word
var extract = require('pdf-text-extract')   // pdf 读取
var pdftext = require('pdf-textstring'); 

var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../public/uploads/20181130/1543548463254.pdf');
let file = '';
fs.readFile(filePath, 'utf8', function(err, data) {
  if(err) throw err;
  // data默认是一个Buffer对象，里面保存的就是一个一个的字节，(理解为字节数组)
  // 把Buffer对象转换为字符串，调用toString()方法
 file = data;
})
  // extract(filePath, function (err, pages) {
  //   if (err) {
  //     console.dir(err,3)
  //     return
  //   }
  //   console.dir(pages,4)
  // })
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
    ctx.body = file.toString();
});


module.exports = router