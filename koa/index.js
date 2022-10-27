const Koa = require("koa")
const Router = require("koa-router")
const cors = require("@koa/cors")
const koaBody = require("koa-body")


const app = new Koa()
const router = new Router()

router.get('/', ctx => {
  console.log(ctx);
  console.log(ctx.request);
  ctx.body = 'hollow world!'
})

router.get('/api', ctx => {
  console.log(ctx);
  console.log(ctx.request);
  ctx.body = 'hollow api!'
})

router.get('/async', async (ctx) => {
  let result = await new Promise((resolve) => {
    setTimeout(function () {
      resolve('Hollo world 2s later!')
    }, 2000)
  })
  ctx.body  = result
})


// 1.request method respond
// 2.api url => function router ?
// 3.ctx, async
// app.use(async ctx => {
//   console.log(ctx);
//   console.log(ctx.request);
//   ctx.body = 'hollow world!'
// })

router.post('/post', async (ctx) => {
  let { body } = ctx.request
  console.log(body);
  console.log(ctx.request);
  ctx.body = {
    ...body
  }
})

app.use(koaBody())
app.use(cors())


app.use(router.routes())
  .use(router.allowedMethods())



app.listen(3000)