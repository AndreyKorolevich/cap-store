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

router.get('/api/items', async (ctx, next) => {
    const { query } = ctx.request;

    const brand = query.brand === undefined ? 0 : Number(query.brand);
    const page = query.page === undefined ? 0 : Number(query.page);
    const countOnPage = query.countOnPage === undefined ? 0 : Number(query.countOnPage);
    const q = query.q === undefined ? '' : query.q.trim().toLowerCase();
    const gender = query.gender === undefined ? 0 : Number(query.brand);
    const price = query.price === undefined ? maxPrice : Number(query.offset);
    const color = query.color === undefined ? 0 : Number(query.color);

    const startPage = page * countOnPage
    const endPage = startPage + countOnPage

    const filtered = items
        .filter(o => brand === 0 || o.brand === brand)
        .filter(o => gender === 0 || o.gender === gender)
        .filter(o => o.price <= price)
        .filter(o => o.title.toLowerCase().includes(q))
        .slice(startPage, endPage)
        .map(itemBasicMapper);

    return fortune(ctx, {filtered, itemsCount: items.length});
});


app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);


