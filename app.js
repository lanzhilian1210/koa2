const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const list = require('./routes/list') // 列表
const users = require('./routes/users') // user表
const classes = require('./routes/class') // class表
const student = require('./routes/student') // class表

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
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
