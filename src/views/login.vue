<template>
    <!-- 全局header 开始-->
    <nv-zjheader>
    </nv-zjheader>
    <!-- 全局header 结束 -->

    <div class="zjd-container bgf4f4f4">
        <!-- 掌金课堂header 开始-->
        <nv-zjdheader>
        </nv-zjdheader>
        <!-- 掌金课堂header 结束 -->

        <!-- 掌金课堂breadcrumb 开始-->
        <nv-zjdbreadcrumb
            breadcrumb = "登录"
            breadcrumburl = "login"
        >
        </nv-zjdbreadcrumb>
        <!-- 掌金课堂breadcrumb 结束-->

        <div class="zjd-top login">
            <div class="zjd-container clearfix">
                <img src="../assets/images/zjd-login-bg.png" alt="zjd-loin-bg" class="login-bg fl">
                <div class="zjd-login fl">
                    <div class="item tr"><a v-link="{name:'register'}">无账号？立即注册</a></div>
                    <div class="input">
                        <p class="item tl">用户名</p>
                        <i class="icon-login-account icon-icon-login-account"></i>
                        <input type="text" class="text-input" name="account" placeholder="手机号码">
                    </div>
                    <div class="input">
                        <p class="item tl">密码</p>
                        <i class="icon-login-pwd icon-icon-login-pwd"></i>
                        <input type="text" class="text-input" name="pwd" placeholder="密码">
                    </div>
                    <div class="item pt8">
                        <input type="checkbox" class="checkbox-input">  记住此用户
                        <a class="fr" v-link="{name:'forget'}">忘记密码</a>
                    </div>
                    <div class="input">
                        <button class="submit-input tc">登 录</button>
                    </div>
                    <div class="item b64a1e tc">可使用掌金APP账户登录</div>
                </div>
            </div>
        </div>

    </div>

    <!-- 全局footer 开始-->
    <nv-zjfooter>
    </nv-zjfooter>
    <!-- 全局footer 结束-->
</template>
<script>
    require('../assets/scss/components/zjdlogin.scss');
    module.exports = {
        data: function() {
        },
        components: {
            'nvZjheader': require('../components/zjheader.vue'),
            'nvZjdheader': require('../components/zjdheader.vue'),
            'nvZjdbreadcrumb': require('../components/zjdbreadcrumb.vue'),
            'nvZjfooter': require('../components/zjfooter.vue')
        }
    }
</script>

