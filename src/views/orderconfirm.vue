<template>
<section class="container-box">
    <a-row>
         <a-col :span="12" class="boldtitle">确认地址信息</a-col>
         <a-col :span="12" class="text-right">
            <span class="addressbtn cursorpoint" @click="addAddr">添加新地址</span>
         </a-col>
    </a-row>
    <a-radio-group v-model="address" style="width: 100%;">
    <div class="addresslist" v-if="addrlist.length > 0" style="border-bottom: none;" :style="{borderBottom : addrlist.length == 1 ? 'none' : ''}">
        <div class="scrollbar">
            <table>
                <tr v-for="(item,index) in addrlist" :class="{'hideAddress' : index > 2 && isShowMoreAddr, 'headtb' : index == 0}">
                    <td><span v-if="index == 0">寄至</span></td>
                    <td>
                        <a-radio :value="item.id">{{item.provinceName}} {{item.cityName}} {{item.areaName}} {{item.detailAddress}}（{{item.contactName}} 收）{{item.contactPhone || item.contactTel}}</a-radio>
                    </td>
                    <td>
                        <div v-if="item.typeId == 0">默认地址</div>
                        <div v-else class="primary cursorpoint" @click="setDefault(item.id)">设置为默认地址</div>
                    </td>
                    <td>
                        <div class="btnlist">
                            <span @click="editAddr(item.id)" class="cursorpoint">修改</span>
                            <span @click="deleteAddr(item.id)" class="cursorpoint">删除</span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="handle-btn-box" v-if="addrlist.length > 3">
            <div v-if="isShowMoreAddr" class="text-center primary cursorpoint" @click="showMoreAddr"><b>更多地址</b></div>
            <div v-else @click="showMoreAddr" class="primary cursorpoint"><a-icon type="up" />收起地址</div>
        </div>
    </div>
    </a-radio-group>
    <editAddress :visible.sync="visible" :id="editAddrId" @confirm="handleSave()"></editAddress>
    <power-of-attorney :validateForm.sync="isValidate" @confirm="getFormvalue" />
    <div class="boldtitle">确认订单信息</div>
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
                <td colspan="5"><span style="font-weight: 600;color: #333;">店铺：{{orderInfo.storeName}}</span></td>
            </tr>
            <tr>
                <td colspan="5" style="padding: 0">
                    <div class="scrollbar projectlist">
                        <table>
                            <tr v-for="(item,index) in commodityInfoList" :key="index">
                                <td width="40%">项目：{{item.commodityName}}</td>
                                <td width="15%" align="left" v-if="orderInfo.isUrgent==1">￥{{item.commodityPrice | capitalizeRate(orderInfo.urgentRate)}}</td>
                                <td width="15%" align="left" v-else>￥{{item.commodityPrice}}</td>
                                <td align="center" width="15%">{{orderInfo.sampleNumber}}份</td>
                                <td align="center" width="15%">{{isUrgent[orderInfo.isUrgent]}}</td>
                                <td width="15%" align="left" v-if="orderInfo.isUrgent==1" >￥{{item.commodityPrice | capitalizeRateNum(orderInfo.sampleNumber,orderInfo.urgentRate)}}</td>
                                <td width="15%" align="left" v-else >￥{{item.commodityPrice | capitalize(orderInfo.sampleNumber)}}</td>
                            </tr>
                            <tbody  v-if="imprintArray.length">
                              <tr v-for="(item,index) in imprintArray" :key="index">
                                <td width="40%">项目：{{item.commodityName}}</td>
                                <td width="15%" align="left">￥{{item.commodityPrice}}</td>
                                <td align="center" width="15%">{{orderInfo.count}}份</td>
                                <td align="center" width="15%">--</td>
                                <td width="15%" align="left">￥{{item.commodityPrice | capitalize(orderInfo.count)}}</td>
                              </tr>
                            </tbody>
                            <!-- <tr v-if="printReport">
                                <td width="40%">项目：加印报告</td>
                                <td width="15%" align="left">￥{{printReport.commodityPrice}}</td>
                                <td align="center" width="15%">{{printReport.num}}份</td>
                                <td align="center" width="15%">--</td>
                                <td width="15%" align="left">￥{{printReport.commodityPrice | capitalize(printReport.num)}}</td>
                            </tr> -->
                        </table>
                    </div>
                </td>
            </tr>

            <tr class="footertb">
                <td colspan="5" class="text-right">
                    实际支付：<b class="red price">￥{{orderInfo.calculation}}</b>
                    <a-button type="danger" class="submitbtn dangerbtn" @click="submitOrder()">提交订单</a-button>
                </td>
            </tr>
        </table>
    </div>
</section>
</template>

<script>
import editAddress from '../components/editAddress'
import powerOfAttorney from '../components/powerOfAttorney'   //委托书
import {getAddresslist, delAddressinfo, setAddrDefault,createIOrder} from '@/service/getData'

const isUrgent = {
  0: '常规',
  1: '加急'
}
export default {
    data () {
        return {
            orderid : this.$route.query.id,
            addrlist : [],
            isShowMoreAddr : true,
            address : '',
            visible : false,    //新建编辑地址
            editAddrId : '',   //编辑地址id
            isValidate : false,
            formValue : '',   //委托书信息
            orderInfo: {},
            commodityInfoList: [],
            commodityInfoListId: [],
            createOrder: {},
            isUrgent: isUrgent,
            imprintArray: [],   //加印报告
        }
    },
    components: {
        editAddress,powerOfAttorney
    },
    filters: {
      capitalize: function (price,count) {   //单价*数量
        if (!price) return ''
        return (price*count).toFixed(2);
      },
      capitalizeRate(price,rate){   //加急时计算
        if (!price) return ''
        return ((price*100 + price*rate)/100).toFixed(2);
      },
      capitalizeRateNum(price,count,rate){     //加急时单价*数量
        if (!price) return ''
        return (((price*100 + price*rate)/100)*count).toFixed(2);
      }
    },
    methods: {
        getAddrList(){
            getAddresslist().then((res) => {
                if(res && res.code == 200){
                  if(res.data.length > 0){
                    this.addrlist = res.data;
                    this.address = res.data[0].id;
                  }
                }
            })
        },
        showMoreAddr(){
            this.isShowMoreAddr = !this.isShowMoreAddr;
        },
        addAddr(){
            this.visible = true;
            this.editAddrId = 0;
        },
        editAddr(id){
            this.visible = true;
            this.editAddrId = id;
        },
        handleSave(){
            this.getAddrList();
        },
        deleteAddr(id){
            let that = this;
            this.$confirm({
                title: '确定删除该地址吗?',
                onOk() {
                    delAddressinfo(id).then((res) => {
                        if(res && res.code == 200){
                            that.$message.success('删除成功');
                            that.getAddrList();
                        }
                    })
                },
            });
        },
        // 设置默认地址
        setDefault(id){
            setAddrDefault(id).then((res) => {
                if(res && res.code == 200){
                    this.$message.success('设置成功');
                    this.getAddrList();
                }
            })
        },
        getFormvalue(value){
            this.formValue = value;
            if(this.formValue.sample){
              this.$set(this.createOrder,'sample',this.formValue.sample);
              this.$delete(this.formValue,'sample');
            }else{
              this.$set(this.createOrder,'sample',[]);
            }
            this.$set(this.createOrder,'proxy',this.formValue);
            this.$set(this.createOrder,'commodityInfoList',this.commodityInfoListId);
            this.$set(this.createOrder,'count',this.orderInfo.count);
            this.$set(this.createOrder,'isUrgent',this.orderInfo.isUrgent);
            this.$set(this.createOrder,'sampleNumber',this.orderInfo.sampleNumber);
            this.$set(this.createOrder,'userAddressId',this.address);
            createIOrder(this.createOrder).then((res) =>{
                if(res && res.code == 200){
                  this.$router.push('/orderPay/'+res.data);
                }
            })
        },
        submitOrder(){
            if(!this.address){
              this.addAddr();
              return false;
            }
            this.isValidate = true;
        }
    },
    mounted() {
        this.getAddrList();
        this.orderInfo = this.$store.getters.getOrderInfo;
        this.commodityInfoList = this.orderInfo.commodityInfoList;
        this.imprintArray = this.orderInfo.imprintArray;
        for(let i=0; i<this.orderInfo.commodityInfoList.length; i++){
           this.commodityInfoListId.push(this.orderInfo.commodityInfoList[i].id);   //请求接口传参只需商品ID
        }
        if(this.imprintArray){
          for(let i=0; i<this.imprintArray.length; i++){
            this.commodityInfoListId.push(this.imprintArray[i].id);   //请求接口传参只需商品ID
          }
        }
    }
}
</script>
<style scoped>
.container-box{
    padding-top: 54px;
}
.boldtitle{
    font-size: 16px;
    font-weight: 500;
    color: #333;
    padding-bottom: 20px;
}
.addressbtn{
    border: 1px solid #333;
    width: 86px;
    line-height: 24px;
    display: inline-block;
    text-align: center;
    color: #333;
}
.addresslist{
    border: 1px solid #D9D9D9;
}
.addresslist table,.addresslist .ant-radio-group{
    width: 100%;
}
.addresslist table td{
    padding: 15px 12px;
}
.addresslist table td:first-child{
    padding-left: 30px;
}
.headtb td{
    background: #F7F6F6;
    border-bottom: 1px solid #D9D9D9;
}
.addresslist .btnlist span{
    padding-left: 20px;
}
.handle-btn-box{
    padding: 15px 20px;
    /*border-bottom: 1px solid #D9D9D9;*/
}
.handle-btn-box .anticon{
    padding-right: 4px;
}
.hideAddress{
    display: none;
}
.addresslist .scrollbar{
    max-height: 256px;
    overflow: auto;
}
.submitbtn{
    margin-left: 80px;
}
.confirmOrderTb .price{
    font-size: 20px;
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
