'use strict'

module.exports=function(router){
    router.map({
        '/':{
            name:'home',
            component:require('./views/index.vue')
        },
        '/list':{               //首页
            name:'list',
            component:require('./views/list.vue')
        },
    })
}