<template>
<section class="container-box">
    <div class="head-title-box">
        <a-row type="flex" align="bottom">
            <a-col :span="16"><b>订单提交成功，请尽快付款！订单号：{{orderid}}</b></a-col>
            <a-col :span="8" class="text-right">应付金额<b class="price red">{{iorder.totalPrices}}</b>元</a-col>
        </a-row>
    </div>
    <div class="addressbox">
        <div>收货地址：{{orderAddress.province}}{{orderAddress.city}}{{orderAddress.area}}{{orderAddress.detailAddress}}</div>
        <div>收货人：{{orderAddress.contactName}}</div>
        <div class="list">服务名称：
          <span v-for="(item,index) in iorder.orderCommodityList" :key="index" style="padding-left: 0;">
              {{item.commodityName}}
          </span>
        </div>
        <div>交期：{{isUrgent[iorder.isUrgent]}}<span>图层样品数量：{{iorder.sampleNumber}} 份</span></div>
    </div>
    <power-of-attorney :id="editid" @confirm="getFormvalue" ref="splist"/>
    <div class="pay-type-box">
        <div>选择支付方式：</div>
        <a-radio-group v-model="payvalue" @change="changePayType">
            <a-radio :value="1">支付宝支付</a-radio>
            <a-radio :value="2">微信支付</a-radio>
            <a-popover placement="topLeft">
                <template slot="content">
                    <a-icon type="exclamation-circle" theme="filled" style="color: #FAAD14;margin-right: 6px;"/>网银支付需要通过个人认证
                </template>
                <a-radio :value="3">网银支付</a-radio>
            </a-popover>
        </a-radio-group>
        <div class="text-right">
            <a-button type="danger" class="submitbtn dangerbtn" @click="confirmPay()">确认支付</a-button>
        </div>
    </div>
    <personalCertification :visible.sync="isPersonal" @confirm="checkPersonal"></personalCertification>
    <checkUnion :visible.sync="isCheckUnion" :orderCode="orderid"></checkUnion>
    <paySuccess
       :visible.sync="successVisible"
       :footer="null"
       :width="422"
       :orderCode="orderid"
       @cancel="handleCancel()"
       @sendByPerson="sendByPerson()"
       @sendByExpress="sendByExpress()">
    </paySuccess>
    <expressModal
      :visible.sync="expressVisible"
      :orderCode="orderid"
      :operation="expressOpt"
      :orderright="orderright"
      @expresssave="expresssave()">
    </expressModal>
    <confirmSend
       :visible.sync="confirmSendVisible"
       :orderCode="orderid"
       @confirmSendOk="confirmSendOk()">
    </confirmSend>
</section>
</template>
<script>
import powerOfAttorney from '../components/powerOfAttorney'   //委托书
import personalCertification from '../components/personalCertification'  //个人认证
import checkUnion from '../components/checkUnion'      //银联支付显示
import expressModal from "../components/expressModal"  //快递送样
import confirmSend from '../components/confirmSend'
import paySuccess from '../components/paySuccess'     //支付成功
import {getOrderDetail,saveEntrust,attestationYes,payByUnionPay,whetherPaySuccess,sendSimpleInPerson} from '@/service/getData'
const isUrgent = {
  0: '常规',
  1: '加急'
}
export default {
    data () {
        return {
            orderid : this.$route.params.id,   //订单编号
            editid : this.$route.params.id,    //订单编号
            formValue : '',
            paytypeOptions : [{ label: '支付宝支付', value: 1 }, { label: '微信支付', value: 2 }, { label: '网银支付', value: 3 }],
            payvalue : 1,
            successVisible : false,
            iorder: '',
            orderAddress: '',
            isUrgent: isUrgent,      //交期方式转文字
            saveEntrustFormBean: {},  //向接口发送参数
            isPersonal: false,
            isCheckUnion: false,
            expressVisible: false,
            expressOpt: 1,    //1=填写   2=修改   3=查看物流
            orderright: '',
            confirmSendVisible: false,
        }
    },
    components: {
        powerOfAttorney,personalCertification,checkUnion,expressModal,confirmSend,paySuccess
    },
    methods: {
        getFormvalue(value){
            this.formValue = value;
            this.$set(this.saveEntrustFormBean, 'sample', value.sample);
            this.$delete(this.formValue,'sample');
            this.$set(this.formValue, 'orderCode', this.orderid);
            this.$set(this.saveEntrustFormBean, 'proxy', this.formValue);
            saveEntrust(this.saveEntrustFormBean).then((res) => {
               if(res && res.code == 200){
                  this.$refs.splist.getEntrust();
               }
            })
        },
        changePayType(e){
            console.log(this.payvalue);
            console.log(e);
            let paytype = e.target.value;
            if(paytype == 3){

            }
        },
        confirmPay(){
            let that = this;
            this.$confirm({
                title: '请确认委托书信息填写正确，支付后不可修改',
                onOk() {
                  that.$store.dispatch('savePaymentType',that.payvalue);
                  if(that.payvalue == 3){
                    attestationYes().then((res) => {
                        if(res && res.code == 200){
                          if(res.data){
                            if(res.data.flag == 1){
                              that.payByUnion();   //银联支付
                            }else{
                              that.isPersonal = true;
                            }
                          }else{
                            that.isPersonal = true;
                          }
                        }
                    })
                  }else{
                    that.$router.push('/pay/'+that.orderid);
                  }
                },
            });
        },
        showOrderDetail(){
           getOrderDetail(this.editid).then((res) => {
             if(res && res.code == 200){
                this.iorder = res.data.iorder;
                this.orderAddress = res.data.orderAddress;
             }
          })
        },
        checkPersonal(value){
          console.log(value);
        },
        payByUnion(){
          let paymentFormBean = {orderCode:this.orderid,paymentType: 3,}
          payByUnionPay(paymentFormBean).then(res =>{
            if(res && res.code == 200){
              this.isCheckUnion = true;
              let Base64 = require('js-base64').Base64;
              let routeData = this.$router.resolve({ path: '/recharge', query: { htmls: Base64.decode(res.data) }});
              window.open(routeData.href, '_blank');
            }
          })
        },
        paySuccess(getPaymentType){
            whetherPaySuccess(this.orderid,getPaymentType).then((res) =>{
              if(res && res.code == 200){
                if(res.data.code == 200){
                  this.successVisible = true;
                }
              }
            })
        },
        handleCancel(){
          this.$router.push('/orderList');
        },
        sendByPerson(){
          this.confirmSendVisible = true;
        },
        confirmexpress(value){
          console.log(value);
        },
        sendByExpress(){
          this.expressVisible = true;
          this.express(1, this.orderid);
        },
        express(type, orderCode) {
          this.expressVisible = true;
          this.expressOpt = type;
        },
        expresssave(){
          this.$router.push('/orderList');
        },
        confirmSendOk(){
          this.$router.push('/orderList');
        }
    },
    mounted(){
      this.showOrderDetail();
      if(this.$store.getters.getPaymentType){
         this.paySuccess(this.$store.getters.getPaymentType);
      }
    }
}
</script>
<style scoped>
.container-box{
    padding-top: 54px;
}
.head-title-box{
    border-bottom: 2px solid #D9D9D9;
    padding-bottom: 20px;
    line-height: 1;
    margin-bottom: 22px;
}
.head-title-box b{font-size: 16px;}
.head-title-box b.price{font-size: 20px;}
.addressbox div{
    margin-top: 20px;
}
.addressbox span{
    margin-left: 60px;
}
.addressbox .list{
    margin-top: 40px;
}
.addressbox .list span{
  margin-left: 0;
}
.addressbox .list span::after{
    content: '、';
}
.addressbox .list span:last-child::after{
    content: '';
}
.pay-type-box{
    background: #F7F6F6;
    padding: 16px 38px 26px 36px;
    color: #333;
    font-weight: 500;
}
.pay-type-box .ant-radio-group{
    padding: 46px 0 60px;
}
.pay-type-box .ant-radio-wrapper{
    margin-right: 98px;
}
.submitbtn{
    margin-left: 80px;
}
</style>
