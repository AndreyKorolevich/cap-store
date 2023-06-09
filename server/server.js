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
    const response = {
        maxPrice: Math.max(...items.map(i => i.price))
    }
    return fortune(ctx, response);
});

router.get('/api/items', async (ctx, next) => {
    const {query} = ctx.request;

    const brand = query.brand === undefined ? 0 : Number(query.brand);
    const page = query.page === undefined ? 0 : Number(query.page);
    const countOnPage = query.countOnPage === undefined ? 5 : Number(query.countOnPage);
    const q = query.q === undefined ? '' : query.q.trim().toLowerCase();
    const gender = query.gender === undefined ? 0 : Number(query.gender);
    const price = query.price === undefined ? maxPrice : Number(query.price);
    const color = query.color === undefined ? 0 : Number(query.color);

    const startPage = page * countOnPage
    const endPage = startPage + countOnPage

    const filtered = items
        .filter(o => brand === 0 || o.brand === brand)
        .filter(o => gender === 0 || o.gender === gender)
        .filter(o => o.price <= price)
        .filter(o => o.name.toLowerCase().includes(q))

    const paginated = filtered.slice(startPage, endPage)

    return fortune(ctx, {paginated, itemsCount: filtered.length});
});


app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);


