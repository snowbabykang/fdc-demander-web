<template>
    <section class="layout-header">
        <a-row>
            <a-col :span="12">
                <a-button type="primary" ghost class="verifybtn">认证平台</a-button>
                <b style="font-size: 0.08rem;">{{title}}</b>
            </a-col>
            <a-col :span="12" class="align-right">
                <router-link :to="'/login'" class="routerlink">登录</router-link>
                <a-divider type="vertical" />
                <router-link :to="'/register'" class="routerlink">注册</router-link>
            </a-col>
        </a-row>
    </section>
</template>
<script>
export default {
    name: 'psdHeader',
    data() {
        return {
            title : ""
        };
    },
    watch: {
        $route(){
            this.title = this.$route.meta.title;
        },
    },
    mounted() {
        this.title = this.$route.meta.title;
    },
};
</script>
<style type="text/css" scoped>
.layout-header{
    max-width: 1200px;
    margin: 0 auto;
}
.verifybtn{
    width: 0.59rem;
    height: 0.16rem;
    border-radius: 0.08rem;
    margin-right: 0.11rem;
    font-size: 0.08rem;
}
.layout-header .routerlink{
    color: #666666;
    font-size: 0.08rem;
}
.layout-header .ant-divider{
    background: #979797;
}
</style>