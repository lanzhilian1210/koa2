const router = require('koa-router')();
var officegen = require('officegen');  //生成word
var extract = require('pdf-text-extract')   // pdf 读取
var fs = require('fs');
var path = require('path');
var pdfText = require('pdf-text')

var filePath = path.join(__dirname, '../public/uploads/20181130/1543548463254.pdf');
var buffer = fs.readFileSync(filePath);
// fs.readFile(filePath, 'utf8', function(err, data){
//     console.log(1);  
// });

var docx = officegen ({
    'type': 'docx',
	'subject': 'abc',
	'keywords': 'dcf',
	'description': 'sdf'
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
    ctx.body = '123213';
});


module.exports = router