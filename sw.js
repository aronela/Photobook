const staticAssets = [
    './index.html',
    './css/style.css',
    './app.js',
    './img/logo.png',
    './img/photobook-cover.jpg',
    './img/photobook-icon1.png',
    './img/photobook-icon2.png',
    './img/photobook-icon3.png',
    './img/section1-icon1.png',
    './img/section1-icon2.png',
    './img/section1-icon3.png',
    './img/section1-icon4.png',
];

self.addEventListener('install', async event => {
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const req = event.request;
const url = new URL(req.url);

if(url.origin === location.origin){
    event.respondWith(cacheFirst(req));
} else {
    event.respondWith(networkFirst(req));
}
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open('news-dynamic');

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}
