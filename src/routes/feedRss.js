const Router = require('express');
const controller = require('../controller/feedRss');

const routesRssFeed = Router();

routesRssFeed.get('/feed-rss/noticias', controller.rssFeedNoticias);

module.exports = routesRssFeed;