const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const brand = JSON.parse(fs.readFileSync('./data/brand.json'));
const gender = JSON.parse(fs.readFileSync('./data/gender.json'));
const items = JSON.parse(fs.readFileSync('./data/products.json'));
const maxPrice = Math.max(...items.map(i => i.price))

const itemBasicMapper = item => ({
    id: item.id,
    category: item.category,
    title: item.title,
    price: item.price,
    images: item.images,
});

const randomNumber = (start, stop) => {
    return Math.floor(Math.random() * (stop - start + 1)) + start;
}

const fortune = (ctx, body = null, status = 200) => {
    const delay = 0;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            ctx.response.status = status;
            ctx.response.body = body;
            resolve();
        }, delay);
    })
}

const app = new Koa();
app.use(cors());
app.use(koaBody({
    json: true
}));

const router = new Router();

router.get('/api/categories', async (ctx, next) => {
    return fortune(ctx, brand);
});
router.get('/api/gender', async (ctx, next) => {
    return fortune(ctx, gender);
});
router.get('/api/maxprice', async (ctx, next) => {
    return fortune(ctx, maxPrice);
});




app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);


