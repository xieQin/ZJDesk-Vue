'use strict'

var Vue = require('vue');
var app = Vue.extend({});
var VueResource = require('vue-resource');
Vue.use(VueResource);
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var validator = require('vue-validator');
Vue.use(validator);

var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});

require('./routers')(router);

router.start(app, "#app");