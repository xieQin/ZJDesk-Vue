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

        
    </div>

    <!-- 全局footer 开始-->
    <nv-zjfooter>
    </nv-zjfooter>
    <!-- 全局footer 结束-->
</template>
<script>
    // require('../assets/scss/base.scss');
    module.exports = {
        data: function() {
            return {
                msg : "hello world Vue!111"
            }
        },
        components: {
            'nvZjheader': require('../components/zjheader.vue'),
            'nvZjdheader': require('../components/zjdheader.vue'),
            'nvZjfooter': require('../components/zjfooter.vue')
        }
    }
</script>

