<template>
<section class="content-white-box notfoundbox">
    <img :src="'../../static/common-img/404.png'">
    <div class="text-center btnlist">
        <a-button type="primary" ghost @click="$router.go(-1)" class="goback" size="large">上一页</a-button>
        <router-link to="/"><a-button type="primary" ghost size="large">回到首页</a-button></router-link>
    </div>  
</section>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            
        },
        mounted() {
        }
    }

</script>
<style scoped>
.notfoundbox{
    text-align: center;
    padding: 63px 0;
}
.notfoundbox img{
    max-width: 785px;
}
.btnlist{
    padding-top: 88px;
}
.btnlist .goback{
    margin-right: 64px;
}
.btnlist .ant-btn{
    width: 142px;
    height: 50px;
}
</style>