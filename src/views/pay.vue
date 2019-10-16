<template>
<section class="container-box">
    <div class="head-title-box">
        <a-row type="flex" align="bottom">
            <a-col :span="16"><b>订单提交成功，请尽快付款！订单号：{{paymentFormBean.orderCode}}</b></a-col>
            <a-col :span="8" class="text-right">应付金额<b class="price red">{{totalPrices}}</b>元</a-col>
        </a-row>
    </div>
    <div class="pay">
        <div class="pay-asign">
          <span class="pay-name"><b>{{payText[paymentFormBean.paymentType]}}支付</b></span>
          <span>距离二维码过期还剩<span class="red">{{countdownNum}}秒</span>，过期后请刷新页面重新获取二维码</span>
        </div>
        <div class="pay-code">
           <div class="pay-code-box" v-if="isShowPayByAliError == false">
              <qrcode size="300" bgcolor="#fff" color="#000" :url="url"></qrcode>
           </div>
          <div class="pay-code-box" v-if="isShowPayByAliError">
            <p class="pay-codespan" style="margin-top: 100px;">请尽快支付</p>
            <p class="pay-codespan" style="color: #DC6741;">刷新页面获取二维码</p>
          </div>
           <span class="pay-code-text">请使用{{payText[paymentFormBean.paymentType]}}扫描二维码<br>以完成支付</span>
        </div>
    </div>
    <div class="payment">
        <p>选择其他支付方式</p>
        <a-row type="flex" align="middle" style="margin-top: 49px;">
            <a-col :span="6" v-if="paymentFormBean.paymentType != 1">
              <img src="static/icon/zfb.png" alt="" @click="payByAli()">
              <b>支付宝支付</b>
            </a-col>
            <a-col :span="6" v-if="paymentFormBean.paymentType != 2">
              <img src="static/icon/wx.png" alt="" @click="payByzWe()">
              <b>微信支付</b>
            </a-col>
            <a-col :span="6" v-if="paymentFormBean.paymentType != 3">
              <img src="static/icon/yinlian.png" alt="" @click="confirmPersonal()">
              <b>银联支付</b>
            </a-col>
        </a-row>
    </div>
    <personalCertification :visible.sync="isPersonal" @confirm="checkPersonal"></personalCertification>
    <checkUnion :visible.sync="isCheckUnion" :orderCode="paymentFormBean.orderCode"></checkUnion>

</section>
</template>

<script>
import personalCertification from '../components/personalCertification'
import qrcode from '../components/qrcode'
import checkUnion from '../components/checkUnion'      //银联支付显示
import {getOrderDetail,payByAlipay,payByWeChat,payByUnionPay,attestationYes,whetherPaySuccess} from '@/service/getData'

const payText = {
  1: '支付宝',
  2: '微信',
  3: '银联'
}

export default {
    data () {
        return {
          totalPrices: '',
          payText: payText,
          isPersonal: false,
          qrcodeurl : '',
          url : '',
          countdownNum: 60,
          canRun: true,
          paymentFormBean: {
            orderCode: this.$route.params.id,
            paymentType: this.$store.getters.getPaymentType,
          },
          isCheckUnion: false,
          param: '',
          paySuccessDown: 120,
          paramByPay: '',
          isShowPayByAliError: false,
        }
    },
    components: {
        personalCertification,qrcode,checkUnion
    },
    methods: {
        getOrderInfo(){
          getOrderDetail(this.paymentFormBean.orderCode).then((res) => {
            if(res && res.code == 200){
              this.totalPrices = res.data.iorder.totalPrices;
            }
          })
        },
        payByAli(){
          this.paymentFormBean.paymentType = 1;
          this.$store.dispatch('savePaymentType',1);
          payByAlipay(this.paymentFormBean).then((res) => {
            if(res && res.code == 200){
              this.carriedOut(res);
            }
          })
        },
        payByzWe(){
          this.paymentFormBean.paymentType = 2;
          this.$store.dispatch('savePaymentType',2);
          payByWeChat(this.paymentFormBean).then((res) => {
            if(res && res.code == 200){
              this.carriedOut(res);
            }
          })
        },
        payByUnion(){
          this.canRun = false;
          this.paymentFormBean.paymentType = 3;
          this.$store.dispatch('savePaymentType',3);
          payByUnionPay(this.paymentFormBean).then(res =>{
            if(res && res.code == 200){
              this.isCheckUnion = true;
              let Base64 = require('js-base64').Base64;
              let routeData = this.$router.resolve({ path: '/recharge', query: { htmls: Base64.decode(res.data) }});
              window.open(routeData.href, '_blank');
            }
          })
        },
        confirmPersonal(){
          attestationYes().then((res) => {
              if(res && res.code == 200){
                if(res.data && res.data.flag == 1){
                  this.payByUnion();
                }else{
                  this.isPersonal = true;
                }
              }
          })
        },
        checkPersonal(value){
          console.log(value);
        },
        creatcode(){
          this.url = this.qrcodeurl;
        },
        countdown(){
            if(this.countdownNum > 0) {
                this.param = setTimeout(this.countdown, 1000); // 1 秒后再次调用自己
                this.countdownNum--;
            }else{
              if(this.paymentFormBean.paymentType == 1){
                this.isShowPayByAliError = true;
              }
            }
        },
        countdownByPay(){
            if(this.paySuccessDown > 0) {
                this.paramByPay = setTimeout(this.countdownByPay, 1000); // 1 秒后再次调用自己
                this.paySuccessDown--;
            }
        },
        paySuccess(){
            whetherPaySuccess(this.paymentFormBean.orderCode,this.paymentFormBean.paymentType).then((res) =>{
              if(res && res.code == 200){
                if(res.data.code == 200){
                  this.canRun = false;
                  this.$router.push('/orderPay/'+this.paymentFormBean.orderCode);
                }else{
                  if(this.paymentFormBean.paymentType == 1){
                    if(this.canRun && this.paySuccessDown>0){
                      setTimeout(this.paySuccess, 5000);
                    }
                  }
                  if(this.paymentFormBean.paymentType == 2){
                    if(this.canRun && this.countdownNum>0){
                      setTimeout(this.paySuccess, 5000);
                    }
                  }
                }
              }
            })
        },
        carriedOut(res){
          clearTimeout(this.param);
          clearTimeout(this.paramByPay);
          this.qrcodeurl = res.data;
          this.countdownNum = 60;
          this.paySuccessDown = 120;
          this.creatcode();
          this.countdown();
          this.countdownByPay();
          this.paySuccess();
        }
    },
    mounted(){
      this.getOrderInfo();
      switch (this.paymentFormBean.paymentType) {
        case 1: this.payByAli();
        break;
        case 2: this.payByzWe();
        break;
        case 3:
        this.payByUnion();
        this.canRun = false;
        break;
      }
    }
}
</script>
<style scoped>
.container-box{
    padding-top: 90px;
}
.head-title-box{
    padding-bottom: 20px;
    line-height: 1;
    margin-bottom: 55px;
}
.head-title-box b{font-size: 16px;}
.head-title-box b.price{font-size: 20px;}
.text-right{text-align: right;}
.pay,.payment{
  width: 1117px;
  height: 450px;
  margin: 0 auto;
  background:rgba(245,245,245,1);
  box-shadow:0px 2px 8px 0px rgba(0,0,0,0.15);
}
.pay-asign{
  width:100%;
  padding-left: 41px;
  line-height:70px;
  background:rgba(255,255,255,1);
}
.pay-asign .pay-name{
  font-size: 18px;
  margin-right: 40px;
}
.pay-code{
  width: 977px;
  height: 300px;
  margin: 40px auto;
  display: flex;
}
.pay-code-box{
  width: 350px;
  height: 100%;
  background: #fff;
  position: relative;
  text-align: center;
  line-height: 300px;
}
.pay-code-box img{
  width: 222px;
  height: 222px;
}
.pay-code-box::before{
  content: '';
  position: absolute;
  top: 40%;
  right: -35px;
  border-top: 28px solid transparent;
  border-bottom: 28px solid transparent;
  border-left: 35px solid #ffffff;
}
.pay-code-text{
  padding-left: 101px;
  padding-top: 118px;
  font-size:20px;
  font-weight:bold;
  color:rgba(74,74,74,1);
  flex: 1;
}
.payment{
  height: 227px;
  background:rgba(255,255,255,1);
  margin-top: 40px;
  padding: 42px 32px;
}
.payment img{
  margin-right: 15px;
  font-size: 60px;
  vertical-align: middle;
  cursor: pointer;
}
.pay-codespan{
  font-size:20px;
  font-weight:bold;
  line-height: 30px;
}
</style>
