const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const session = require('koa-session')
const list = require('./routes/list') // 列表
const users = require('./routes/users') // user表  // jwt处理
const newUsers = require('./routes/newUser') // 新user表 session 处理
const classes = require('./routes/class') // class表
const student = require('./routes/student') // class表
//  session
app.keys = ['some secret hurr'];
const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false //(boolean) renew session when session is nearly expired,
};

const {connect} = require('./database/init.js');
(async () =>{
  await connect()
})()
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(cors())
app.use(require('koa-static')(__dirname + '/public'))
// session
app.use(session(CONFIG, app));
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// routes 路由
app.use(list.routes(), list.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(classes.routes(), classes.allowedMethods())
app.use(student.routes(), student.allowedMethods())
app.use(newUsers.routes(), newUsers.allowedMethods()) // 新user
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
