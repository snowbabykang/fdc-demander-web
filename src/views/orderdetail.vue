<template>
<section>
    <div class="breadcrumb-box">
        <span>当前位置：</span>
        <a-breadcrumb separator=">">
            <a-breadcrumb-item>个人中心</a-breadcrumb-item>
            <a-breadcrumb-item>我的订单</a-breadcrumb-item>
            <a-breadcrumb-item>订单：{{orderCode}}</a-breadcrumb-item>
        </a-breadcrumb>
    </div>

  <div v-if="data">
    <div class="whitebox" v-if="orderstep < 9">
        <div class="order-step-box">
            <orderStep :currentStep="orderstep" :orderHistoryList="data.orderHistoryList" />
        </div>
    </div>
    <div class="whitebox">
        <div class="tablebox order-status-box">
            <div class="table-cell order-operate-box">
                <div class="order-operate-con">
                    <div class="ordernum">订单号：{{orderCode}}</div>
                    <div class="orderstatus">
                        {{orderstatusArr[orderstep]}}
                        <span class="red" v-if="orderstep == 1">剩余{{countdownTime}}</span>
                        <span class="red" v-if="orderstep == 7">还剩{{countdownTime}}自动确认</span>
                        <span class="red" v-if="orderstep == 9">取消原因：{{cancelReasonText[data.iorder.cancelReason]}}</span>
                    </div>
                    <div v-if="orderstep == 1">
                        <router-link :to="'/orderPay/'+orderCode" class="router">
                          <a-button type="danger" size="small" class="dangerbtn">付款</a-button>
                        </router-link>
                    </div>
                    <div v-else-if="orderstep == 2">
                        <div><a-button type="primary" size="small" @click="sendByPerson()">亲自送样</a-button></div>
                        <div><a-button type="primary" size="small" @click="express(1)">快递送样</a-button></div>
                    </div>
                    <div v-else-if="orderstep == 3">
                        <div class="primarylink" v-if="iorder.sendType == 1" @click="express(3)">查看寄样物流</div>
                        <div class="primarylink" v-if="iorder.sendType == 1" @click="express(2)">修改寄样物流</div>
                    </div>
                    <div v-else-if="orderstep == 7">
                        <a-button type="danger" size="small" class="dangerbtn" @click="confirmReorder()">确认收单</a-button>
                        <div class="primarylink" @click="express(4)">查看物流</div>
                    </div>
                    <div v-else-if="orderstep == 9">
                        <div class="primarylink" @click="showEntrust()">查看委托书</div>
                    </div>

                    <div v-if="orderstep == 6 || orderstep == 7 || orderstep == 8">
                        <div class="primarylink" @click="downloadDetection()">下载报告单</div>
                    </div>
                    <div v-if="orderstep == 1 || orderstep == 2">
                        <div class="primarylink" @click="cancelorder()">取消订单</div>
                        <div class="primarylink" @click="showEntrust()">查看委托书</div>
                    </div>
                </div>
            </div>
            <div class="table-cell">
                <div class="order-timeline scrollbar">
                    <a-timeline>
                        <a-timeline-item v-for="(item,index) in data.orderHistoryList" :key="index">
                            <span class="time">{{item.createTime}}</span>
                            <span class="info" v-if="item.typeId">{{history[item.typeId]}}</span>
                            <span class="info" v-if="item.typeId ==3">
                              <span v-for="(item,index) in data.expressList" :key="index">
                                <span v-if="item.flag == 0">已寄样，寄样物流   公司：{{item.expressCompany}}   物流号：{{item.expressNumber}}</span>
                              </span>
                              <span v-if="iorder.sendType == 0">已寄样，亲自送样</span>
                            </span>
                            <span class="info" v-if="item.typeId ==9"><span v-if="data.refund">，退款操作已完成，金额已原路返回，请您查收</span> </span>
                            <div v-if="item.typeId ==7" class="logisticsbox">
                                <div>您的订单开始处理</div>
                                <div v-for="(item,index) in data.expressList" :key="index">
                                  <div v-if="item.flag == 1">物流公司：{{item.expressCompany}}</div>
                                  <div v-if="item.flag == 1">物流单号：{{item.expressNumber}}</div>
                                </div>
                            </div>
                        </a-timeline-item>
                    </a-timeline>
                </div>
            </div>
        </div>
    </div>
    <div class="whitebox">
        <div class="addressInfobox">
            <a-row>
                <a-col :span="8" class="addressInfo">
                    <div class="title"><b>收货人信息</b></div>
                    <div>收单人：{{orderAddress.contactName}}</div>
                    <div>地址：{{orderAddress.province}}{{orderAddress.city}}{{orderAddress.area}}{{orderAddress.detailAddress}}</div>
                    <div>电话：{{orderAddress.contactPhone}} <span v-if="orderAddress.contactTel">(座机：{{orderAddress.contactTel}})</span></div>
                </a-col>
                <a-col :span="8" class="addressInfo payinfo" v-if="orderstep != 1 && orderstep != 9 && payment">
                    <div class="title"><b>付款信息</b></div>
                    <div v-if="payment">支付方式：{{paymentTypes[payment.paymentType]}}支付</div>
                    <div v-if="payment">支付时间：{{payment.createTime}}</div>
                </a-col>
                <a-col :span="8" class="addressInfo logisticsinfo" v-if="orderstep > 2 && orderstep < 9">
                    <div class="title"><b>配送信息</b></div>
                    <div v-for="(item,index) in data.expressList" :key="index" >
                      <div v-if="item.flag == 0">寄样物流号：{{item.expressNumber}}</div>
                      <div v-if="item.flag == 1">检测物流号：{{item.expressNumber}}</div>
                      <div style="padding-bottom: 0;">配送物流：{{item.expressCompany}} <span class="primarylink updateLogistics" v-if="orderstep == 3 && item.flag == 0" @click="express(2)">修改</span></div>
                    </div>
                    <div v-if="iorder.sendType==0">亲自送样</div>
                </a-col>
            </a-row>
        </div>
    </div>
    <div class="whitebox">
        <div class="addresslist">
            <table class="confirmOrderTb">
                <tr class="headtb">
                    <td width="40%">服务信息</td>
                    <td width="15%">单价</td>
                    <td width="15%" align="center">样品数量</td>
                    <td width="15%" align="center">交期</td>
                    <td width="15%">总计</td>
                </tr>
                <tr class="shoptb">
                    <td colspan="5"><span style="font-weight: 600;color: #333;">店铺：{{iorder.storeName}}</span></td>
                </tr>
                <tr>
                    <td colspan="5" style="padding: 0">
                        <div class="scrollbar projectlist">
                            <table>
                                <tr v-for="(item,index) in commodityInfoList" :key="index">
                                    <td width="40%">项目：{{item.commodityName}}</td>
                                    <td width="15%" align="left">￥{{item.urgentPrice}}</td>

                                    <td align="center" width="15%" v-if="item.commodityName == '加印报告'">{{item.count}}份</td>
                                    <td align="center" width="15%" v-else>{{iorder.sampleNumber}}份</td>

                                    <td align="center" width="15%" v-if="item.commodityName == '加印报告'">--</td>
                                    <td align="center" width="15%" v-else>{{isUrgent[iorder.isUrgent]}}</td>

                                    <td width="15%" align="left" v-if="item.commodityName == '加印报告'">￥{{item.urgentPrice | capitalize(item.count)}}</td>
                                    <td width="15%" align="left" v-else >￥{{item.urgentPrice | capitalize(iorder.sampleNumber)}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class="footertb">
                    <td colspan="5" class="text-right">
                        实际支付：
                        <b class="price" v-if="payment">￥{{payment.paymentAmount}}</b>
                        <b class="price" v-else>未付款</b>
                        <a-button type="default" class="downloadbtn" @click="downloadEntrust()">一键下载委托书</a-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <cancelOrder :visible.sync="cancelOrderVisible" :orderCode="orderCode" @confirm="confirmCancelOrder" @delateOrder="delateOrder()"></cancelOrder>
    <entrustModal :visible.sync="entrustVisible" :imgSrc="entrust" @confirm="downloadEntrust()"></entrustModal>
    <expressModal
       :visible.sync="expressVisible"
       :orderCode="orderCode"
       :operation="expressOpt"
       :orderright="orderright"
       @expresssave="expresssave()"
    >
    </expressModal>
    <confirmReceipt
       :visible.sync="confirmReceiptVisible"
       @confirm="confirmProduct"
       :orderCode="orderCode"
       :orderright="orderInfo"
       @confirmReceipt="confirmReceipt()"
    >
    </confirmReceipt>
    <confirmSend
       :visible.sync="confirmSendVisible"
       :orderCode="orderCode"
       @confirmSendOk="confirmSendOk()">
    </confirmSend>
    <detectionModal :visible.sync="detectionVisible"></detectionModal>
  </div>
  <div v-else>
      <loading :visible="true"></loading>
  </div>
</section>
</template>
<script>
import orderStep from '../components/orderStep'
import cancelOrder from '../components/cancelOrder'
import entrustModal from '../components/entrustModal'
import expressModal from '../components/expressModal'
import confirmReceipt from '../components/confirmReceipt'
import detectionModal from '../components/detectionModal'
import confirmSend from '../components/confirmSend'
import loading from '../components/loading';          //loading
import {paymentTypes,isUrgent,cancelReasonText,history} from '../api/dictionary'
import {getOrderDetail,showEntrust,downEntrust,sendSimpleInPerson,downLoadReport} from '@/service/getData'
export default {
    data () {
        return {
            orderCode: this.$route.params.id,
            orderstep : 1,
            orderstatusArr : {
                1 : '待付款',
                2 : '已付款',
                3 : '已寄样',
                4 : '已收样',
                5 : '检测中',
                6 : '检测完成',
                7 : '待收单',
                8 : '订单已完成',
                9 : '订单已取消',
            },
            cancelOrderVisible : false,
            entrustVisible : false,
            expressVisible : false,
            expressOpt : '',   //1=填写   2=修改   3=查看物流
            orderright: '',
            confirmReceiptVisible : false,
            detectionVisible : false,
            data: '',                //总信息
            iorder: '',              //订单信息
            orderAddress: '',        //地址
            commodityInfoList: [],   //商品信息
            payment: '',             //付款信息
            isUrgent: isUrgent,
            entrust: '',             //委托书预览地址
            paymentTypes: paymentTypes,
            remainingTime: '',       //待付款剩余时间
            remaining: true,         //待付款剩余时间倒计时开关
            orderInfo: '',
            confirmSendVisible: false,
            cancelReasonText: cancelReasonText,
            countdown: true,
            countdownTime: '',
            history: history,
        }
    },
    components : {
        orderStep,cancelOrder,entrustModal,expressModal,confirmReceipt,detectionModal,confirmSend,loading
    },
    filters: {
      capitalize: function (price,count) {   //单价*数量
        if (!price) return ''
        return (price*count).toFixed(2)
      }
    },
    methods: {
        // 取消订单
        cancelorder(){
            this.cancelOrderVisible = true;
        },
        confirmCancelOrder(value){
            console.log("取消订单理由"+value);
        },
        delateOrder(){
            this.getOrder();
        },
        // 查看委托书
        showEntrust(){
            this.entrust = showEntrust(this.orderCode);
            this.entrustVisible = true;
        },
        downloadEntrust(){
            console.log('下载委托书');
            window.open(downEntrust(this.orderCode));
        },
        // 快递寄样
        express(type){
            this.expressVisible = true;
            this.expressOpt = type;
            if (type == 2 || type == 3 || type == 4) {
              this.orderright = this.data.expressList;
            }
        },
        // 确认收货
        confirmReorder(){
            this.confirmReceiptVisible = true;
            this.orderInfo = {
              commodityInfoList:this.data.iorder.orderCommodityList,
              sampleNumber:this.data.iorder.sampleNumber,
              isUrgent:this.data.iorder.isUrgent,
            }
        },
        confirmProduct(){
            console.log("确认收货返回");
        },
        // 下载报告单
        downloadDetection(){
          //  this.detectionVisible = true;
            window.open(downLoadReport(this.iorder.id,this.$store.getters.getToken));
        },
        getOrder(){
          getOrderDetail(this.orderCode).then((res) =>{
             if(res && res.code == 200){
               this.data = res.data;
               this.iorder = res.data.iorder;
               this.payment = res.data.payment;
               this.commodityInfoList = res.data.iorder.orderCommodityList;
               this.orderAddress = res.data.orderAddress;
               this.orderstep = res.data.iorder.typeId;
               if(this.iorder.typeId == 1 || this.iorder.typeId == 7){
                 this.countdown = true;
                 this.goCountdown();
               }
             }
          })
        },
        sendByPerson(){
          this.confirmSendVisible = true;
        },
        confirmSendOk(){
          this.getOrder();
        },
        expresssave(){
          this.getOrder();
        },
        confirmReceipt(){
          this.confirmReceiptVisible = false;
          this.getOrder();
        },
        goCountdown(){
          if(this.countdown){
            --this.data.min;
            if(!this.data.day){
              this.data.day = 0;
            }
            if(this.data.min < 0){
                --this.data.hour;
                this.data.min = 59;
            }
            if(this.data.hour < 0){
                --this.data.day;
                this.data.hour = 23;
            }
            if(this.data.day < 0){
                this.data.min = 0;
                this.data.hour = 0;
                this.data.day = 0;
            }
            this.countdownTime = this.data.day+"天"+this.data.hour+"时"+this.data.min+"分";
            setTimeout(this.goCountdown,60000);
          }
          if(this.data.min == 0 && this.data.hour == 0 && this.data.day == 0){
            this.countdown = false;
          }
        },
    },
    mounted(){
      this.getOrder();
    }
}
</script>
<style scoped>
.whitebox{
    background: #fff;
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.15);
    margin-bottom: 40px;
}
.breadcrumb-box{
    padding: 64px 0 20px;
    color: #333;
}
.breadcrumb-box .ant-breadcrumb{
    display: inline-block;
}
.breadcrumb-box >>> .ant-breadcrumb-link{
    color: #333;
}
.addressInfobox{
    padding-top: 30px;
}
.addressInfo{
    padding: 0px 30px 48px;
    font-weight: 500;
}
.addressInfo .title{
    padding-bottom: 30px;
}
.addressInfo div{
    padding-bottom: 20px;
}
.payinfo,.logisticsinfo{
    border-left: 1px solid #D9D9D9;
    padding-left: 72px;
}
.updateLogistics{
    padding-left: 40px;
}
.order-step-box{
    padding: 52px 0 60px;
}
.order-status-box{
    width: 100%;
    height: 270px;
    overflow: hidden;
}
.order-operate-box{
    vertical-align: top;
    width: 326px;
    text-align: center;
    padding: 20px 0px;
}
.order-operate-box .ordernum{}
.order-operate-box .orderstatus{
    font-size:22px;
    font-weight:500;
    color: #333;
    line-height: 1;
    padding: 34px 0 36px;
}
.order-operate-box .orderstatus .red{
    padding-top: 14px;
    font-size: 12px;
    display: block;
    font-weight: normal;
}
.order-operate-box .ant-btn{
    margin-bottom: 8px;
    padding-left: 16px;
    padding-right: 16px;
}
.order-operate-con{
    border-right: 1px solid #d9d9d9;
    height: 230px;
}
.order-timeline{
    vertical-align: top;
    color: #333;
    height: 270px;
    overflow: auto;
    padding: 25px 0 0 55px;
}
.order-timeline >>> .ant-timeline-item-head{
    background: #d9d9d9;
    border-color: #d9d9d9;
}
.order-timeline >>> li:last-child .ant-timeline-item-head{
    background: #2300A8;
    border-color: #2300A8;
}
.order-timeline .time{
    padding: 0 30px 0 8px;
}
.order-timeline .info{
    font-weight: 500;
}
.order-timeline .logisticsbox{
    background: #EDEDED;
    padding: 10px 62px 0px;
    color: #333333;
    margin-left: 226px;
    margin-top: 10px;
    display: inline-block;
    width: 438px;
}
.order-timeline .logisticsbox div{
    padding-bottom: 10px;
}

.addresslist{
    border: 1px solid #D9D9D9;
}
.addresslist table{
    width: 100%;
}
.addresslist table td{
    padding: 15px 20px;
}
.headtb td{
    background: #F7F6F6;
    border-bottom: 1px solid #D9D9D9;
}
.confirmOrderTb .price{
    font-size: 20px;
    padding-right: 44px;
    color: #333;
}
.shoptb td{
    background: #FBFBFB;
}
.footertb td{
    padding: 40px 15px!important;
}
.projectlist{
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    max-height: 244px!important;
    overflow: auto;
}
</style>
