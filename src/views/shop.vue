<template>
  <div class="container">
      <div class="action" v-if="serviceInfo.length">
        <div class="enter flexbox">
          <img :src="storeInfo.picUrl" class="enter-img" alt="">
          <div class="box">
              <div class="enter-name">店铺名：{{storeInfo.storeName}}</div>
              <ul class="enter-cation flexbox">
                <li><img src="static/icon/huizhang.png" />资质审核</li>
                <li><img src="static/icon/qiye.png" />企业认证</li>
                <li><img src="static/icon/phone.png" />联系方式：{{storeInfo.storePhone}}</li>
              </ul>
              <div class="enter-process">
                <b>
                 购买流程：选择规格 <a-icon type="caret-right" /> 选择多服务 <a-icon type="caret-right" /> 立即购买（合计为服务*样品数量）<a-icon type="caret-right" /> 填写委托书
                </b>
              </div>
              <div class="enter-num">
                  <span>样品数量：</span>
                  <span class="enter-num-box">
                    <button type="button" @click="sampleNumLess()">-</button>
                     <input type="text" v-model="samplesNumber" @change="onChange()">
                     <button type="button" @click="sampleNumPlus()">+</button>
                  </span>
              </div>
              <div class="enter-period">
                  <span>交期：</span>
                  <a-radio-group name="radioGroup" :defaultValue="0" @change="periodChange" v-model="periodValues">
                    <a-radio :value="0">常规</a-radio>
                    <a-radio :value="1" v-if="storeInfo.isUrgent == 1">加急</a-radio>
                  </a-radio-group>
              </div>
              <div class="enter-buy" >
                  <div class="enter-buy-price">
                    <p>￥<span>{{calculation}}</span></p>
                  </div>
                  <button type="button" class="enter-buy-btn" @click="buyNow()">立即购买</button>
              </div>
          </div>
        </div>
        <div class="content">
           <div class="content-title flexbox">
              <div class="content-title-bg"  v-for="(list,index) in list" :key="list.value" :class="{ active: isActive == index }"  @click="changActive(index)">
                <p>{{list}}</p>
              </div>
           </div>
           <div class="content-box">
              <div class="service" v-if="isActive == 0">
                <div class="service-items flexbox" v-if="imprintInfo">
                    <input type="checkbox" v-model="imprint">
                    <p class="service-items-name">加印报告</p>
                    <p class="service-items-price">￥<span>{{imprintInfo.commodityPrice}}</span>.00</p>
                    <div class="service-items-num">
                      <button type="button" @click="reportLess()">-</button>
                      <input type="text" :value="imprintReport" readonly="readonly">
                      <button type="button" @click="reportPlus()">+</button>
                    </div>
                    <router-link :to="'/serviceDetail/'+imprintInfo.id" class="service-items-router">
                      详情
                    </router-link>
                </div>
                <div class="service-items flexbox" v-for="items in serviceInfo" :key="items.id">
                    <input type="checkbox" name=""
                      :value="{'id':items.id,'commodityPrice':items.commodityPrice,'commodityName':items.commodityName}"
                      v-model="serviceCheckedVal"
                    >
                    <p class="service-items-name">{{items.commodityName}}</p>
                    <p class="service-items-price">￥<span>{{items.commodityPrice}}</span></p>
                    <router-link :to="'/serviceDetail/'+items.id" class="service-items-router">
                      详情
                    </router-link>
                </div>
              </div>
              <div class="presentation" v-if="isActive != 0">
                  <agencyPresentation :storeInfo="storeInfo" v-if="isActive == 1"></agencyPresentation>
                  <expert-introduction :storeInfo="storeInfo" v-if="isActive == 2"></expert-introduction>
                  <div v-html="presentation" v-if="isActive == 3"></div>
              </div>
           </div>
        </div>
      </div>
      <div v-else>
          <loading :visible="true"></loading>
      </div>
      <a-modal
            centered
            :footer="null"
            :closable= "false"
            v-model="isShowModal"
            :width="286"
            @cancel = "handleCancel()"
     >
          <div class="modal-content">
              <div class="modal-content-al flexbox"><span>!</span>提示</div>
              <p class="modal-content-text">请选择服务、样品数量、交期</p>
              <a-button type="primary" @click="isShowModal = false">确定</a-button>
          </div>
     </a-modal>
  </div>
</template>
<script>
import expertIntroduction from '../components/expertIntroduction'  //专家介绍组件
import agencyPresentation from '../components/agencyPresentation'  //机构介绍组件
import loading from '../components/loading'  //loading
import {getStoreDetail} from '@/service/getData'
export default {
   name: 'Shop',
   components: {
     expertIntroduction,agencyPresentation,loading
   },
   data(){
     return{
       storeId: this.$route.params.id,  //店铺Id
       storeInfo: '',                   //店铺信息店铺是否支持加急 0-不支持 1-支持
       serviceInfo:[],
       list:['服务项目','机构介绍','专家介绍','主要设备'],
       isActive: 0,                         //服务列表样式切换key
       samplesNumber: 1,                    //样品数量
       imprintReport: 1,                    //加印报告数量
       imprintInfo: '',                     //加印信息
       imprintReportPrice: 0,              //加印价格
       imprint: '',                         //是否加印
       imprintArray: [],
       serviceCheckedVal:[],                //服务项目value数组存放
       periodValues: 3,                     //加急或者常规value
       serviceId: [],                       //服务Id
       servicePrice: [],                    //服务价格
       presentation: '',
       isShowModal: false,
       orderInfo: {},
     }
   },
   methods:{
     changActive:function(index){
       this.isActive = index;
     },
     onChange(){
       if(this.samplesNumber == 0){
         this.samplesNumber = 1;
       }else if(this.samplesNumber > 9999){
         this.samplesNumber = 9999;
       }else{
         this.samplesNumber = parseInt(this.samplesNumber);
       }
     },
     //样品数量加减
     sampleNumLess:function(){
       if(this.samplesNumber>1){
         this.samplesNumber = this.samplesNumber -1;
       }
     },
     sampleNumPlus:function(){
       if(this.samplesNumber <= 9999){
         this.samplesNumber = this.samplesNumber +1;
       }
     },
     //加印报告加减
     reportLess:function(){
       if(this.imprintReport>1){
         this.imprintReport = this.imprintReport -1;
         this.imprintReportPrice = (this.imprintInfo.commodityPrice*this.imprintReport).toFixed(2);
       }
     },
     reportPlus:function(){
       if(this.imprintReport <= 9999){
         this.imprintReport = this.imprintReport +1;
         this.imprintReportPrice = (this.imprintInfo.commodityPrice*this.imprintReport).toFixed(2);
       }
     },
     //交期：加急或常规
     periodChange(event){
       this.periodValues = event.target.value;
     },
     //合计总价运算
     totalMoneyCal:function(serviceTotal){
        if(this.imprint){
            let totol = (parseInt(serviceTotal*this.samplesNumber) + parseInt(this.imprintReportPrice)*100)/100;
            return totol.toFixed(2);
        }else{
            let totolNoImprint = parseInt(serviceTotal*this.samplesNumber)/100;
            return totolNoImprint.toFixed(2);
        }
     },
     buyNow:function(){
       if(!this.servicePrice.length && !this.imprintArray.length){
          this.isShowModal = true;
       }else{
          this.$set(this.orderInfo,'commodityInfoList',this.serviceCheckedVal);
          this.$set(this.orderInfo,'sampleNumber',this.samplesNumber);
          this.$set(this.orderInfo,'isUrgent',this.periodValues);
          this.$set(this.orderInfo,'calculation',this.calculation);
          this.$set(this.orderInfo,'storeName',this.storeInfo.storeName);
          this.$set(this.orderInfo,'imprintArray',this.imprintArray);
          if(this.servicePrice.length == 0){
            this.$set(this.orderInfo,'sampleNumber',0);
          }
          if(this.imprintArray.length){
            this.$set(this.orderInfo,'count',this.imprintReport);
          }
          if(this.orderInfo.isUrgent == 1){
             this.$set(this.orderInfo,'urgentRate',this.storeInfo.urgentRate);
          }
          this.$store.dispatch('saveOrderInfo',this.orderInfo);
          this.$router.push('/orderConfirm/'+this.storeId);
       }
     },
     showStoreInfo(){
       getStoreDetail(this.storeId).then(res => {
          if(res && res.code == 200){
            this.storeInfo = res.data.storeInfo;
            this.serviceInfo = res.data.list;
            if(res.data.storeInfo.equipmentIntroduction){
              this.presentation = decodeURIComponent(res.data.storeInfo.equipmentIntroduction);
            }
            for(let i=0; i<this.serviceInfo.length; i++){
                if(this.serviceInfo[i].commodityName == "加印报告"){
                   this.imprintInfo = this.serviceInfo[i];
                   this.imprintReportPrice = this.serviceInfo[i].commodityPrice;
                   this.serviceInfo.splice(i,1);
                }
            }
          }
       })
     },
   },
  computed: {
     calculation:function(){
        let serviceTotal = 0;   //服务总价
        if(this.servicePrice.length || this.imprintArray.length){
            if(this.periodValues != 3){
              if(this.periodValues == 0){   //常规
                  for (let j = 0; j < this.servicePrice.length; j++) {
                      serviceTotal = (serviceTotal*100 + this.servicePrice[j]*100);
          　　　　 }
                   return this.totalMoneyCal(serviceTotal);
              }else{
                  for (let j = 0; j < this.servicePrice.length; j++) {
                    serviceTotal = (serviceTotal*100 + this.servicePrice[j]*100 +  this.servicePrice[j]*this.storeInfo.urgentRate );
          　　　　 }
                   return this.totalMoneyCal(serviceTotal);
              }
            }else{
              this.isShowModal = true;
              return 0;
            }
        }else{
          return 0;
        }
     },
  },
   watch:{
     //服务是否选择
      serviceCheckedVal:function(new_v,old_v){
        this.serviceId = [];
        this.servicePrice = [];
        for (let i = 0; i < this.serviceCheckedVal.length; i++) {
            this.serviceId.push(this.serviceCheckedVal[i].id);
            this.servicePrice.push(this.serviceCheckedVal[i].commodityPrice);
　　　　 }
      },
      imprint:function(new_v,old_v){
          if(this.imprint){
            this.imprintArray.push(this.imprintInfo);
          }else{
            this.imprintArray = [];
          }
      },
   },
   mounted(){
      this.showStoreInfo();
   }
}
</script>
<style scoped>
.ant-modal-body{
  padding: 0 !important;
}
li{
  list-style: none;
}
.flexbox{
  display: flex;
}
.container{
  position: relative;
  min-width: 1200px;
  min-height: 500px;
}
.action{
  position: relative;
  width: 1200px;
  margin: 0 auto;
  margin-top: 52px;
}
.enter .enter-img{
  width:344px;
  height:302px;
}
.enter .box{
  margin-left: 36px;
  font-size:14px;
  font-weight:500;
}
.enter .box .enter-name{
  width:820px;
  height:47px;
  padding-left: 13px;
  background:rgba(35,0,168,1);
  font-size:20px;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:47px;
}
.enter .box .enter-process{
  width:820px;
  height:56px;
  border-bottom:1px dashed rgba(151,151,151,1);
  font-size:14px;
  color:rgba(51,51,51,1);
  line-height:56px;
}
.enter .box .enter-cation{
  width:820px;
  height:66px;
  padding: 10px;
  margin-bottom: 0;
  background:rgba(233,233,233,1);
}
.enter .box .enter-cation li{
  line-height: 46px;
  margin-right: 8px;
}
.enter .box .enter-cation li img{
  vertical-align: sub;
  margin-right: 3px;
}
.enter .box .enter-num{
  margin-top: 34px;
  margin-bottom: 31px;
}
.enter .box .enter-num button{
  width:32px;
  height:32px;
  background:rgba(255,255,255,1);
  border: 0;
}
.enter .box .enter-num input{
  width:45px;
  height:32px;
}
.enter .box .enter-num .enter-num-box{
  display: inline-block;
  width: 113px;
  height: 34px;
  border: 1px solid rgba(217,217,217,1);
}
.enter .box .enter-num,.enter .box .enter-period{
  padding-left: 10px;
  font-weight: bold;
}
.enter .box .enter-buy{
  margin-top: -18px;
  width: 820px;
  height: 33px;
  display: flex;
  justify-content: flex-end;
}
.enter .box .enter-buy .enter-buy-price p::before{
  content: '合计：';
  color:rgba(51,51,51,1);
}
.enter .box .enter-buy .enter-buy-price p{
  color: #E6212B;
  margin: 0;
  padding: 0;
}
.enter .box .enter-buy .enter-buy-price p span{
  font-size: 24px;
}
.enter .box .enter-buy .enter-buy-btn{
  width:102px;
  height:33px;
  margin-left: 36px;
  background:rgba(230,33,43,1);
  color:rgba(255,255,255,1);
  border: 0;
}
.enter-period >>> .ant-radio{
  margin-bottom: 2px;
}
.enter-period >>> .ant-radio-inner{
  width: 12px;
  height: 12px;
}
.enter-period >>> .ant-radio-inner:after{
  position: absolute;
  width: 8px;
  height: 8px;
  left: 1px;
  top: 1px;
  background: rgba(230,33,43,1);
}
.enter-period >>> .ant-radio-checked .ant-radio-inner {
  border-color: rgba(230,33,43,1);
}
.content{
  margin-top: 88px;
}
.content .content-title{
  width:100%;
  height:53px;
  border:1px solid rgba(223,223,223,1);
}
.content .content-title .content-title-bg{
  width: 90px;
  height: 51px;
}
.content .content-title .content-title-bg:hover{
  cursor: pointer;
}
.content .content-title .content-title-bg p{
  width: 90px;
  height: 15px;
  line-height: 15px;
  border-right: 1px dashed #d9d9d9;
  margin-bottom: 0;
  margin-top: 20px;
  text-align: -webkit-center;
}
.content .content-title .active{
  position: relative;
  color: rgba(35,0,168,1);
  border: 1px solid;
}
.content .content-title .active::before{
  content: '';
  position: absolute;
  top: 0;
  left: 45%;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #2300A8;
}
.content .content-title .active p{
  border-color: transparent;
}
.content-box .service{
  width: 100%;
  max-height: 716px;
  padding: 37px 0px 38px 30px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(230,230,230,1);
  overflow: auto;
}
.content-box .service .service-items{
  height: 14px;
  position: relative;
}
.content-box .service .service-items:not(:first-child){
  margin-top: 54px;
}
.content-box .service .service-items input[type='checkbox']{
  width: 14px;
  height: 14px;
  margin-right: 35px;
  position: relative;
}
.content-box .service .service-items input[type="checkbox"]::before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 14px;
  height: 14px;
  border: 1px solid #d9d9d9;
}
.content-box .service .service-items input[type="checkbox"]:checked::before{
  content: "";
  background-color:#e50232;
  position: absolute;
  top: 0;
  left: 0;
  width:14px;
  background: url('../../static/icon/right.png');
  border: 0;
}
.content-box .service .service-items .service-items-name{
  width: 550px;
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:14px;
}
.content-box .service .service-items .service-items-price{
  width: 191px;
  font-size:14px;
  font-weight:400;
  color:rgba(230,33,43,1);
  line-height:14px;
}
.content-box .service .service-items .service-items-price span{
  font-size:20px;
}
.content-box .service .service-items .service-items-num{
  margin-top: -7px;
  width: 97px;
  height: 27px;
  border: 1px solid rgba(217,217,217,1);
}
.content-box .service .service-items .service-items-num button{
  width: 24px;
  height: 25px;
  background:rgba(255,255,255,1);
  border:0;
}
.content-box .service .service-items .service-items-num input{
  width:45px;
  height:25px;
}
.enter .box .enter-num input,.content-box .service .service-items .service-items-num input{
  margin-left: -3px;
  margin-right: -4px;
  background:rgba(255,255,255,1);
  border:0;
  text-align: center;
  border-left: 1px solid rgba(217,217,217,1);
  border-right: 1px solid rgba(217,217,217,1);
}
.content-box .service .service-items .service-items-router{
  position: absolute;
  right: 87px;
  bottom: 0;
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:14px;
}
.content-box .presentation{
  width: 1200px;
  padding: 37px 30px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(230,230,230,1);
}
.modal-content{
  text-align: center;
}
.modal-content .modal-content-al{
  margin-top: 13px;
  margin-bottom: 17px;
  font-size:14px;
  font-weight:500;
  color:rgba(51,51,51,1);
  justify-content: center;
}
.modal-content .modal-content-al span{
  display: block;
  width: 16px;
  height: 16px;
  margin-top: 3px;
  margin-right: 9px;
  background: rgba(250,173,20,1);
  color: #fff;
  line-height: 16px;
  border-radius: 100%;
}
.modal-content .modal-content-text{
  margin-bottom: 46px;
}
.modal-content button{
  border-radius: 4px;
}
</style>

