'use strict'

module.exports=function(router){
    router.map({
        '/':{				//首页
            name:'index',
            component:require('./views/index.vue')
        },
        '/login': {	        //登录
        	name:'login',
        	component:require('./views/login.vue')
        },
        '/register': {
            name:'register',
            component:require('./views/register.vue')
        },
        '/forget': {
            name:'forget',
            component:require('./views/test.vue')
        },
        '/test': {
            name:'test',
            component:require('./views/test.vue')
        }
    })
}