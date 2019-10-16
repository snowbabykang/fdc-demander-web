<template>
  <div class="container-re">

     <div class="register">
       <div class="descript">
         <div class="logo">
           <img src="static/register-img/logo.png" alt="">
         </div>
         <div class="line"></div>
         <ul class="label">
           <li>
             <img src="static/register-img/data.png" alt=""> 统一数据接收
           </li>
           <li>
             <img src="static/register-img/baogao.png" alt=""> 统一报告
           </li>
           <li>
             <img src="static/register-img/zhang.png" alt=""> 统一盖章
           </li>
           <li>
             <img src="static/register-img/zheng.png" alt=""> 统一认证
           </li>
         </ul>
       </div>
       <div class="form">
          <a-form id="components-form-demo-normal-login" :form="form" class="login-form"  @submit="handleSubmit">
              <a-form-item>
                <a-input placeholder="请输入手机号" v-model="phoneNumber"  @blur="checkPhone()">
                  <a-icon slot="prefix"  type="user" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input type="password" v-model="password" placeholder="请输入密码" @blur="checkPwd()">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input type="password" v-model="passwordAgain" placeholder="再次输入密码" @blur="checkPwd()">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" class="form-row">
                  <a-col >
                    <a-input placeholder="手机验证码" v-model="verificationCode" class="form-row-code"/>
                  </a-col>
                  <a-col >
                    <a-button v-model="disabled" @click="codebtn()" :disabled="disabled">{{btn}}</a-button>
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item>
                <a-checkbox style="color:rgba(35,0,168,1);" clearable="true" :checked="checked" @change="onChange">
                </a-checkbox>
                <span class="primarylink" @click="dealVisible = true">《FDC》协议</span>
              </a-form-item>
              <a-form-item class="form-button">
                <a-button type="primary" html-type="submit" class="login-form-button" @click="register($event)">
                  注册
                </a-button>
                <a-button type="primary" html-type="button" class="login-form-button" @click="goLogin()">
                  用户登录
                </a-button>
              </a-form-item>
          </a-form>
          <div class="verification" v-show="isShow"><a-icon type="close-circle" />{{messages}}</div>
       </div>
     </div>
     <sub-success-modal :visible="isShowModal" :width="390" message="注册成功" :messageByEnter="false" ref="subSuccessModal"></sub-success-modal>
     <fdcDeal :visible.sync="dealVisible"></fdcDeal>
  </div>
</template>
<script>
import subSuccessModal from '../components/subSuccessModal'
import fdcDeal from '../components/fdcDeal'
import {Encrypt} from '../api/env'
import {registered,sendNoted} from '@/service/getData'
import {validatePsd} from '../api/validateForm.js'

export default {
  name: 'Register',
  components: {
     subSuccessModal,fdcDeal
  },
  data () {
    return{
      phoneNumber: "",           //手机号
      password: '',              //密码
      passwordAgain: '',         //密码
      checked: false,             //是否勾选协议
      verificationCode: '',      //手机验证码
      messages: "",              //提示框显示信息
      isShow: false,             //提示框是否显示
      btn:"获取验证码",
      disabled:false,
      c:60,
      isShowModal: false,        //注册成功弹窗
      dealVisible : false,
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
     handleSubmit (e) {
       e.preventDefault();
       this.form.validateFields((err, values) => {
         if (!err) {
           console.log('Received values of form: ', values);
         }
       });
     },
     checkPhone(){
       if(this.phoneNumber){
          if(!(/^1[3456789]\d{9}$/.test(this.phoneNumber))){
            this.isShow = true;
            this.messages = "哎呀~！手机号输入有误";
            return false;
          }else{
            this.isShow = false;
            return true;
          }
       }else{
          this.isShow = true;
          this.messages = "哎呀~！请输入手机号";
          return false;
       }
     },
     checkPwd(){
       let check = this.checkPhone();
       if(check){
          if(this.password){
             let vali = validatePsd(this.password);
              if(vali){
                  this.isShow = true;
                  this.messages = vali;
              }else{
                if(this.passwordAgain){
                    if(this.password != this.passwordAgain){
                        this.isShow = true;
                        this.messages = "哎呀~！密码不一致";
                        return false;
                    }else{
                      this.isShow = false;
                      return true;
                    }
                }else{
                  this.isShow = true;
                  this.messages = "哎呀~！请再次输入密码";
                  return false;
                }
              }
          }else{
            this.isShow = true;
            this.messages = "哎呀~！请输入密码";
            return false;
          }
       }
     },
     onChange (e) {
      this.checked = e.target.checked;
      if(this.checked){
        this.isShow = false;
      }else{
        this.isShow = true;
        this.messages = "哎呀~！请勾选协议";
      }
     },
     checkCode(){
        if(!this.verificationCode){
          this.isShow = true;
          this.messages = "哎呀~！请获取验证码";
        }else{
          this.isShow = false;
        }
     },
     codebtn(){
       let check = this.checkPwd();
       if(check){
         console.log(this.phoneNumber);
          sendNoted(this.phoneNumber).then(res =>{
            console.log(res);
            if(res.code == 200){
                this.disabled = true;
                setTimeout(this.enableCodeBtn,1000);
            }
          })
       }
     },
     enableCodeBtn(){
        if(this.c > 0) {
            this.btn = this.c+"秒后重新获取";
            setTimeout(this.enableCodeBtn, 1000); // 1 秒后再次调用自己
            this.c--;
        } else {
            this.disabled=false;
            this.btn= "获取短信验证码";
            this.c = 60;
        }
     },
     register(event) {
       let checkPhone = this.checkPhone();
       let checkPwd = this.checkPwd();
       if(!checkPhone){
         this.checkPhone();
         return;
       }
       if(!checkPwd){
         this.checkPwd();
         return;
       }
       if(!this.verificationCode){
         this.isShow = true;
         this.messages = "哎呀~！请获取验证码";
         return;
       }
       if(!this.checked){
         this.isShow = true;
         this.messages = "哎呀~！请勾选协议";
         return;
       }
       this.isShow = false;
       this.registerGo();
     },
     registerGo(){
       let self = this;
       registered(this.verificationCode,Encrypt(this.password),this.phoneNumber).then(res => {
         if(res.code == 200){
           this.$store.dispatch('saveToken',res.data.token);
           this.$store.dispatch('saveLoginPhone',this.phoneNumber);
           this.isShowModal = true;
           this.$refs.subSuccessModal.walkCode();
           setTimeout(function(){
              self.$router.push('/');
           },5000)
         }
       })
     },
     goLogin(){
       this.$router.push('/login');
     }
  }
}
</script>
<style  scoped>
li{
  list-style: none;
}
.container-re{
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../../static/register-img/bg.png')no-repeat;
  background-size: cover;
}
.register{
  position: relative;
  width: 5.89063rem;
  height: 3.40104rem;
  background:rgba(35,0,168,1);
  display: flex;
}
.register .descript{
  width: 2.49rem;
  padding: 0.42708rem 0.29167rem 0 0.34896rem;
}
.register .descript .logo{
  width: 1.6rem;
  height: 0.34rem;
}
.register .descript .logo img{
  width: 100%;
}
.register .descript .line{
  width: 0.5625rem;
  height: 0.02083rem;
  margin: 0.32813rem 0 0.28646rem 0;
  background:rgba(255,255,255,1);
}
.register .descript .label{
  width: 1.09375rem;
  height: 0.91667rem;
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.register .descript .label li{
  font-size: 0.125rem;
  color: rgba(255,255,255,1);
  line-height: 0.22917rem;
}
.register .descript .label li img{
  margin-right: 0.125rem;
  vertical-align: baseline;
}
.form{
  flex: 1;
  background:rgba(255,255,255,1);
}
.form{
  position: relative;
}
.form .login-form {
  width: 2.39583rem;
  margin: 0.43229rem auto;
}
.form .login-form >>> .ant-form-item{
  margin-bottom: 0.15625rem;
}
.form .login-form .login-form-forgot {
  float: right;
}
.form .login-form .login-form-button {
  width: 100%;
}
.form .login-form >>> .ant-input-affix-wrapper{
  height: 0.26042rem;
}
.form .login-form >>> .anticon{
  color: rgba(153,153,153,1);
  font-size: 0.13021rem;
}
.form .login-form >>> .anticon-lock{
  color: rgba(153,153,153,1);
}
.form .login-form >>> .ant-input{
  padding-left: 0.26042rem;
  font-size: 0.08333rem;
  font-weight:500;
  color:rgba(153,153,153,1);
  border:1px solid rgba(151,151,151,1);
}
.form .login-form >>> .ant-btn-default{
  width: 0.73958rem;
  height: 0.26042rem;
  padding: 0;
  background: rgba(51,51,51,1);
  font-size: 0.07292rem;
  font-weight: 500;
  text-align: center;
  color: rgba(255,255,255,1);
}
.form .login-form .form-button{
  padding-top: 0.10417rem;
}
.form .login-form .form-button >>> .ant-form-item-children{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.form .login-form .form-button >>> .ant-form-item-children button{
  width: 1.03125rem;
  height: 0.33854rem;
  background: rgba(35,0,168,1);
  font-size: 0.11458rem;
  font-weight:500;
}
.form .login-form .form-button >>> .ant-form-item-children button:nth-child(2){
  color: #2300A8;
  background: #fff;
  border: 0;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0);
}
.form .verification{
  position:absolute;
  top: 0;
  left: 0;
  width: 3.4rem;
  height: 0.29167rem;
  padding-left: 0.125rem;
  background:rgba(255,255,255,1);
  border:1px solid rgba(245,34,45,1);
  font-size:16px;
  font-weight:500;
  color:rgba(245,34,45,1);
  line-height:0.29167rem;
}
.form .verification i{
  margin-right: 0.08333rem;
}
.form .form-row{
  display: flex;
  justify-content: space-between;
}
.form .form-row-code{
  width: 1.5rem;
  height: 0.26042rem;
  margin-right: 0.13rem;
  padding-left: 10px !important;
}
.modal-content p{
  margin-top: 14px;
  margin-bottom: 20px;
  font-size:14px;
  font-weight:500;
  color:rgba(51,51,51,1);
}
.modal-content a{
  margin-top: 33px;
  font-size:14px;
  font-weight:500;
  color:rgba(40,0,177,1);
}
.modal-content a span{
  color: #333333;
}

.login-form >>> .ant-input{
  border-radius: 0;
}
</style>
