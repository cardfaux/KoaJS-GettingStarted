const Koa = require('koa');
const koaRouter = require('koa-router');
const json = require('koa-json');

// instantiate the Koa server
const app = new Koa();
// instantiate the Koa router
const router = new koaRouter();

// set up the koa-json middleware
app.use(json());

// logger *setting the X-Response-Time header*
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// middlewares for the router
app.use(router.routes());
app.use(router.allowedMethods());

// this is the routes start
// router.get('/', async function (ctx) {
//   return ctx.body = '<h1>this is the homepage</h1>';
// });
router.get('/', async (ctx) => {
  return ctx.body = '<h1>this is the homepage</h1>';
});

// router.get('/about', async function (ctx) {
//   return ctx.body = '<h1>about this koa router set up</h1>';
// });
router.get('/about', async (ctx) => {
  return ctx.body = '<h1>about this koa router set up</h1>';
});

// router.get('/contact', async function (ctx) {
//   return ctx.body = '<h1>this is the contact page</h1>';
// });
router.get('/contact', async (ctx) => {
  return ctx.body = '<h1>this is the contact page</h1>';
});

// router.get('/gallery', async function (ctx) {
//   return ctx.body = '<h1>this is the gallery page</h1>';
// });
router.get('/gallery', async (ctx) => {
  return ctx.body = '<h1>this is the gallery page</h1>';
});

router.get('/api/users', async (ctx) => {
  return ctx.body = [
    {
      'username' : 'jameshagood87',
      'name': 'James Hagood',
      'age': 33
    },
    {
      'username' : 'billy87',
      'name': 'Billy Hagood',
      'age': 17
    }
  ];
});
// this is the routes end

// bootstrap the serve and log to the conole
app.listen(3000, () => {
  console.log('server is running on port 3000');
});
