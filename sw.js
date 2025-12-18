const CACHE_NAME = 'realkana-v1';

// List all files to cache
const FILES_TO_CACHE = [
	'/',
	'/index.html',
	'/hiragana.html',
	'/katakana.html',
	'/study.html',
	'/extra.html',
	'/logo.png',
	'/favicon.ico',
	'/apple-icon.png',
	'/background.jpg',
	'/app.jpg',
	'/download.svg',
	'/rating.png',
	'/kana-19.png',
	'/kana-50.png',
	'/typeface-1.png',
	'/typeface-2.png',
	'/typeface-3.png',
	'/typeface-4.png',
	'/typeface-5.png',
	'/typeface-6.png',
	'/typeface-7.png',
	'/typeface-8.png',
	'/typeface-9.png',
	'/_next/static/chunks/webpack-5cf4a627ee84fc35.js',
	'/_next/static/chunks/polyfills-42372ed130431b0a.js',
	'/_next/static/chunks/main-app-c29131b30cea0236.js',
	'/_next/static/chunks/4bd1b696-e6e110106eb68198.js',
	'/_next/static/chunks/129-7a04070b14383794.js',
	'/_next/static/chunks/163-d5c131c4b417ebcd.js',
	'/_next/static/chunks/347-dce3af82919dc071.js',
	'/_next/static/chunks/359-a5d6cecc5b1d5d29.js',
	'/_next/static/chunks/477-070f003bd85548ec.js',
	'/_next/static/chunks/483-1a3cb9e722bf626a.js',
	'/_next/static/chunks/498-ca33b13c8786e64a.js',
	'/_next/static/chunks/572-0f8c9c979a90a1a9.js',
	'/_next/static/chunks/613-fd21eba98cf86472.js',
	'/_next/static/chunks/684-8dcc3b39553139f4.js',
	'/_next/static/chunks/890-462163f82b4b80a8.js',
	'/_next/static/chunks/app/layout-a1c5c3b40e90d6e9.js',
	'/_next/static/chunks/app/not-found-d69ee4c13645d040.js',
	'/_next/static/chunks/app/page-70da99925c208f7c.js',
	'/_next/static/chunks/app/extra/page-5187a39748cb1428.js',
	'/_next/static/chunks/app/hiragana/page-f55f4957a63fb515.js',
	'/_next/static/chunks/app/katakana/page-ae47c8161f62376b.js',
	'/_next/static/chunks/app/study/page-ce367b04993552a2.js',
];

// cache all files
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then((cache) => {
			console.log('Caching app files');
			return cache.addAll(FILES_TO_CACHE);
		})
		.then(() => self.skipWaiting())
	);
});

// clean up old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
		return Promise.all(
			cacheNames.map((cache) => {
			if (cache !== CACHE_NAME) {
				console.log('Deleting old cache:', cache);
				return caches.delete(cache);
			}
			})
		);
		}).then(() => self.clients.claim()) // Take control of all pages
	);
});

// serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
		.then((cachedResponse) => {
			if (cachedResponse) {
			return cachedResponse;
			}
			// Not in cache, fetch from network
			return fetch(event.request).then((response) => {
			// Optionally cache new requests dynamically
			if (response.status === 200 && event.request.method === 'GET') {
				const responseClone = response.clone();
				caches.open(CACHE_NAME).then((cache) => {
				cache.put(event.request, responseClone);
				});
			}
			return response;
			});
		})
		.catch(() => {
			return caches.match('/index.html');
		})
	);
});