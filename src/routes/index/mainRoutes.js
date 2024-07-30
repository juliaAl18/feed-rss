const Router = require('express');
const routesFeedRss = require('../feedRss');

const routesMain = Router();

const routesAll = [
    routesMain,
    routesFeedRss,
]

module.exports = routesAll;