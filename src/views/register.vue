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
            breadcrumb="注册"
            breadcrumburl = "register"
        >
        </nv-zjdbreadcrumb>
        <!-- 掌金课堂breadcrumb 结束-->

        <!-- 掌金课堂注册 开始-->
        <div class="zjd-top register w1200 clearfix">
            <div class="register-section fl">
                <div class="input">
                    <p class="item tl">手机号</p>
                    <input type="text" class="text-input" name="phone">
                </div>
                <div class="input clearfix">
                    <p class="item tl">短信验证</p>
                    <input type="text" class="text-input w170 fl" name="code">
                    <button class="code-input tc fl">获取验证码</button>
                </div>
                <div class="input">
                    <p class="item tl">设置密码</p>
                    <input type="text" class="text-input" name="code">
                </div>
                <div class="input">
                    <p class="item tl">确认密码</p>
                    <input type="text" class="text-input" name="code">
                </div>
                <div class="item pt8">
                    <input type="checkbox" class="checkbox-input">  注册协议
                </div>
                <div class="input">
                    <button class="submit-input tc">注 册</button>
                </div>
            </div>
            <a class="register-ad" href="#3"><img src="../assets/images/zjd-register-ad.png" alt="register-ad"></a>
        </div>
        <!-- 掌金课堂注册 结束-->

    </div>

    <!-- 全局footer 开始-->
    <nv-zjfooter>
    </nv-zjfooter>
    <!-- 全局footer 结束-->
</template>
<script>
    require('../assets/scss/components/zjdregister.scss');
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

