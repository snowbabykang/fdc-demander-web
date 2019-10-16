<template>
    <section>
        <section class="layout-header">
            <a-row class="header-top">
                <a-col :span="12">
                    <a href="https://www.fdcfabric.com/" class="routerlink">FDC官网</a>
                    <router-link :to="'/login'" class="routerlink" v-if="token == ''">登录</router-link>
                    <router-link :to="'/register'" class="routerlink" v-if="token == ''">注册</router-link>
                    <a href="javascript:;" class="routerlink" v-if="token">你好，{{loginPhone}}</a>
                    <a @click="logout()" class="routerlink" v-if="token">退出</a>
                </a-col>
                <a-col :span="12" class="align-right" v-if="token">
                    <router-link :to="'/orderList'" class="routerlink">我的订单</router-link>
                    <router-link :to="'/personalcertificate'" class="routerlink">个人中心</router-link>
                    <a v-if="$store.getters.getOrgId" :href="testurl" class="routerlink">后台管理</a>
                    <router-link v-if="!$store.getters.getOrgId" to="/entering" class="routerlink">机构入驻</router-link>
                </a-col>
                <a-col :span="12" class="align-right" v-else>
                    <router-link to="/login" class="routerlink">我的订单</router-link>
                    <router-link to="/login" class="routerlink">个人中心</router-link>
                    <router-link to="/login" class="routerlink">机构入驻</router-link>
                </a-col>
            </a-row>
        </section>
        <section class="layout-header-search" v-if="$route.path !== '/404'">
            <a-row class="searchbox search-header-box" type="flex" align="middle">
                <a-col :span="8"><router-link to="/"><img src="../../static/common-img/logo.png" alt=""></router-link></a-col>
                <a-col :span="16" class="align-right">
                    <a-input-search @search="onSearch" size="large">
                        <a-select slot="addonBefore" defaultValue="service" class="search-options">
                          <a-select-option value="service">服务</a-select-option>
                          <!-- <a-select-option value="shop">店铺</a-select-option> -->
                        </a-select>
                        <a-button slot="enterButton" type="primary"><a-icon type="search" /></a-button>
                    </a-input-search>

                </a-col>
            </a-row>
        </section>
    </section>
</template>
<script>
import {logout} from '@/service/getData'
export default {
    data() {
        return {
            token: this.$store.getters.getToken,
            loginPhone: this.$store.getters.getLoginPhone,
            testurl : process.env.testerUrl+'?token='+this.$store.getters.getToken+'&orgid='+this.$store.getters.getOrgId+'&storeid='+this.$store.getters.getStoreId+'&phone='+this.$store.getters.getLoginPhone
        };
    },
    methods : {
        onSearch(value){
            this.$store.dispatch('saveName',value);
            this.$router.push('/services');
        },
        logout(){
            logout().then(res => {
                if(res && res.code == 200){
                    this.$store.dispatch('removeToken');
                    this.$router.push('/login');
                }
            })
        }
    },
    mounted() {
    },
};
</script>
<style lang='less'>
.search-header-box .ant-input{
    border-top-color: @primary-color;
    border-right-color: @primary-color;
    border-bottom-color: @primary-color;
}
.search-header-box .ant-input-group-addon{
    border-color: @primary-color;
}
</style>
<style scoped>
.layout-header{
    border-bottom: 1px solid #D9D9D9;
    height: 36px;
    line-height: 36px;
    background: #fff;
}
.header-top{
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 4px 0 15px;
}
.header-top .routerlink{
    color: #666;
    padding: 0 8px;
}
.header-top .routerlink:hover{
    color: #2300A8;
}

.layout-header-search{
    background: #fff;
}
.nowhitebg .layout-header-search{
  background: #F5F5F5;
}
.searchbox{
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 20px 20px 40px;
}
.search-options{width: 74px}
.search-header-box >>> .ant-input-suffix{
    right: 0;
}
.searchbox  >>> .ant-input-group-addon{border-radius: 0;}
</style>

