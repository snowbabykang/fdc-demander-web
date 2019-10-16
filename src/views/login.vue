<template>
    <div class="loginfixed">
        <div class="loginbox">
            <div class="errormsgbox" v-if="errormsg"> <a-icon type="close-circle" />{{errormsg}} </div>
                <a-form :form="form" layout="horizontal" @submit="handleSubmit" class="login-form">
            <div class="login-content">
                <div class="loginlogo"><img src="static/common-img/loginlogo.png" alt=""></div>
                    <a-form-item>
                        <a-input size="large" type="text" v-model="forminfo.phone" placeholder="请输入手机号"  @blur="checkPhone">
                            <a-icon slot="prefix" type="user" style=""/>
                        </a-input>
                    </a-form-item>
                    <a-form-item class="psd-form-item">
                        <a-input size="large" type="password" v-model="forminfo.password" @blur="validatePassword" placeholder="请输入密码">
                            <a-icon slot="prefix" type="lock"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item class="code-form-item">
                        <a-row type="flex" align="bottom">
                            <a-col class="imgcodebox">
                                <a-input size="large" type="text" placeholder="校验码" v-model="forminfo.code"></a-input>
                                <img :src="imgCode">
                            </a-col>
                            <a-col :span="8"><div class="changeCode" @click="changeCode()">换一张<a-icon type="sync"/></div></a-col>
                        </a-row>
                    </a-form-item>
                <div class="link-groups">
                    <router-link :to="'/verifyIdentity'" class="routerlink">忘记密码</router-link>
                    <router-link :to="'/register'" class="routerlink">立即注册</router-link>
                </div>
            </div>
            <a-button type="primary" block class="login-btn" html-type="submit">立即登录</a-button>
                </a-form>
        </div>
    </div>
</template>

<script>
import {validatePhone,validatePsd} from '../api/validateForm.js'
import {Encrypt} from '../api/env'
import {verifyImgCode, login} from '@/service/getData'
const createImgCode = process.env.API_HOST+"/imageCode/createCode";
export default {
  	name: 'Login',
  	data () {
	    return {
	        form: this.$form.createForm(this),
            forminfo: {
                phone : "",
                password: "",
                code: "",
            },
            errormsg : "",
            imgCode : createImgCode
	    }
  	},
    methods: {
        // 更换验证码
        changeCode(){
            this.imgCode = createImgCode +"?"+Math.random() ;
            this.forminfo.code = '';
        },
        checkPhone(){
            let phone = this.forminfo.phone;
            if(!phone ){
                this.errormsg = "哎呀~！请输入手机号";
                return false;
            }
            this.errormsg = validatePhone(phone);
            return this.errormsg ? false : true;
        },
        validatePassword  () {
            let psd = this.forminfo.password;
            if(!psd ){
                this.errormsg = "哎呀~！请设置密码";
                return false;
            }
            this.errormsg = validatePsd(psd);
            return this.errormsg ? false : true;
        },
        handleSubmit  (e) {
            e.preventDefault();
            if(!this.checkPhone() || !this.validatePassword()){
                return false;
            }
            if(!this.forminfo.code){
                this.errormsg = "哎呀~！还没输入验证码";
                return false;
            }
            let info = this.forminfo;
            verifyImgCode(info.code).then(res => {
                if(res && res.code == 200){
                    login( info.phone, Encrypt(info.password) ).then(res => {
                        if(res && res.code == 200){
                            this.$store.dispatch('saveToken',res.data.token);
                            this.$store.dispatch('saveOrgId',res.data.orgId);
                            this.$store.dispatch('saveStoreId',res.data.storeId);
                            this.$store.dispatch('saveLoginPhone',info.phone);
                            this.$router.push('/');
                        }
                    })
                }
            })
        },
    },
    mounted(){
        this.$store.commit('resetState');
    }
}
</script>

<style scoped lang="less">
.loginbox{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: @primary-color;
    width:3.4rem;
    height:3.4rem;
}
</style>
<style scoped>
.loginfixed{
    background-image: url('../../static/common-img/loginbg.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.login-btn{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0.33rem;
    line-height: 0.33rem;
    font-size: 0.11rem;
    text-align: center;
    color: #fff;
    background: #2942D6;
    border: none; 
}
.login-btn:hover{
    background: #1A32C4;
}
.login-btn:active{
    background: #0924C1;
}
.login-content{
    padding: 0.43rem 0.54rem 0.46rem 0.46rem;
}
.loginlogo{
    text-align: center;
    margin-bottom: 0.38rem;
}
.loginlogo img{
    width: 2.13rem;
}

.errormsgbox{
    position: absolute;
    height: 0.29rem;
    margin-bottom: 0.03rem;
    top: -0.32rem;
    background: #fff;
    width: 100%;
    border: 0.01rem solid #F5222D;
    padding-left: 0.13rem;
    line-height: 0.29rem;
    color: #F5222D;
    font-size: 0.08rem;
    font-weight: 500;
}
.errormsgbox .anticon{
    font-size: 0.13rem;
    margin-right: 0.08rem;
    vertical-align: middle;
    margin-top: -0.02rem;
}
.link-groups .routerlink{
    color: #fff;
    font-size: 0.07rem;
    padding-right: 0.1rem;
}
.changeCode{
    color: #DBE7FF;
    font-size: 0.06rem;
    line-height: 1.4;
    padding-left: 0.07rem;
    cursor: pointer;
}
.imgcodebox{
    position: relative;
    height: 0.26rem;
    overflow: hidden;
    width: 1.4rem;
}
.imgcodebox .ant-input{
    width: 0.77rem;
    position: absolute;
}
.imgcodebox img{
    width: 0.6rem;
    height: 0.26rem;
    position: absolute;
    left: 0.77rem;
}
.changeCode .anticon{
    font-size : inherit;
    padding-left:0.03rem;
}

.login-form .anticon{
    color: #999;
    font-size: 0.15rem;
}
.psd-form-item{
    margin: 0.21rem 0 0.19rem 0;
}
.code-form-item{
    margin-bottom : 0.1rem;
}
.changeCode .anticon{
    font-size : inherit;
    padding-left:0.03rem;
}
.login-form >>> .ant-input-affix-wrapper .ant-input-prefix {
    left: 0.06rem;
}
.login-form >>> .ant-input-affix-wrapper .ant-input{padding-left:0.23rem;}
.login-form >>> .ant-input{height:0.26rem;font-size: 0.08rem;border-radius: 0;}
</style>
