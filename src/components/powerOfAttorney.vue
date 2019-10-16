<!-- 委托单填写修改componets -->
<template>
<a-form :form="form">
    <div class="attorneyTb">
        <table>
            <tr class="headtb borderbnone">
                <td colspan="7"><b>样布大小说明</b></td>
            </tr>
            <tr class="borderbnone">
                <td colspan="7">
                    <a-row>
                        <a-col :span="6" v-for="(item,index) in sampleDetail" :key="index">
                          <span v-if="item.sampleType == 0">
                            {{item.commodityName}}样布尺寸：
                            <span class="red" v-if="item.commodityWidth">{{item.commoditySize}}cm*{{item.commodityWidth}}cm</span>
                            <span class="red" v-else>{{item.commoditySize}}cm*通幅</span>
                          </span>
                          <span v-else>
                            {{item.commodityName}}样布件数：
                            <span class="red">{{item.commoditySize}}件</span>
                          </span>
                        </a-col>
                    </a-row>
                </td>
            </tr>
            <tr class="headtb">
                <td colspan="7"><b>委托书填写</b></td>
            </tr>
            <tr>
                <td colspan="2">委托方(全称)</td>
                <td colspan="2" class="bluebg input-td">
                    <a-form-item>
                        <div v-if="editid && !isEdit" class="text-left">{{returnProxy.userName}}</div>
                        <a-input maxlength="50" v-else v-decorator="['userName', {rules: [{ required: true, message: '请输入委托方(全称)' }],initialValue:returnProxy.userName}]" placeholder="请输入"/>
                    </a-form-item>
                </td>
                <td>委托日期</td>
                <td colspan="2" class="bluebg text-left">
                  <a-form-item>
                        <!-- <div v-if="editid && !isEdit" class="text-left">{{returnProxy.trustDate}}</div> -->
                        <!-- <a-input v-else v-decorator="['trustDate', {rules: [{ required: true, }],initialValue:trustDate}]" /> -->
                        <a-date-picker v-decorator="['trustDate', timeRule() ]" @change="onChange"/>
                    </a-form-item>
                </td>
            </tr>
            <tr>
                <td colspan="2">付款单位</td>
                <td colspan="2" class="bluebg input-td">
                    <a-form-item>
                        <div v-if="editid && !isEdit" class="text-left">{{returnProxy.paymentUnit}}</div>
                        <a-input maxlength="50" v-else v-decorator="['paymentUnit', {rules: [{ required: true, message: '请输入付款单位' }],initialValue:returnProxy.paymentUnit}]" placeholder="请输入"/>
                    </a-form-item>
                </td>
                <td>联系电话</td>
                <td colspan="2" class="bluebg input-td">
                    <a-form-item>
                        <div v-if="editid && !isEdit" class="text-left">{{returnProxy.tel}}</div>
                        <a-input v-else v-decorator="['tel', { rules: phoneRule,initialValue:returnProxy.tel}]" placeholder="请输入"/>
                    </a-form-item>
                </td>
            </tr>
            <tr>
                <td width="56" style="padding-top: 0;padding-bottom: 0;">样品编号</td>
                <td>样品名称</td>
                <td>货、款号/色号</td>
                <td>原料成分</td>
                <td>类别/等级</td>
                <td>商 标</td>
                <td>样品粘贴处</td>
            </tr>
            <tr v-for="(item,index) in sampleNumber" :key="index">
                <td>
                  <a-form-item>
                        <a-input v-decorator="[`sample[${index}].sampleNo`, {rules: [{ required: false}],initialValue:index+1}]" read-only />
                  </a-form-item>
                </td>
                <td class="input-td">
                    <a-form-item>
                        <div v-if="editid && !isEdit" class="text-left">{{item.sampleName}}</div>
                        <a-input maxlength="50" v-else v-decorator="[`sample[${index}].sampleName`, {rules: [{ required: true, message: '请输入样品名称' }],initialValue:item.sampleName}]" placeholder="请输入"/>
                    </a-form-item>
                </td>
                <td class="input-td">
                    <a-form-item>
                        <div v-if="editid && !isEdit" class="text-left">{{item.styleNo}}</div>
                        <a-input maxlength="99" v-else v-decorator="[`sample[${index}].styleNo`, {rules: [{ required: true, message: '请输入货、款号/色号' }],initialValue:item.styleNo}]" placeholder="请输入"/>
                    </a-form-item>
                </td>
                <td class="input-td">
                    <a-form-item>
                        <div v-if="editid && !isEdit" class="text-left">{{item.composition}}</div>
                        <a-input maxlength="99" v-else v-decorator="[`sample[${index}].composition`, {rules: [{ required: false}],initialValue:item.composition}]" placeholder="请输入"/>
                    </a-form-item>
                </td>
                <td class="input-td">
                    <a-form-item>
                        <div v-if="editid && !isEdit" class="text-left">{{item.typeLevel}}</div>
                        <a-input maxlength="50" v-else v-decorator="[`sample[${index}].typeLevel`, {rules: [{ required: false}],initialValue:item.typeLevel}]" placeholder="请输入"/>
                    </a-form-item>
                </td>
                <td class="input-td">
                    <a-form-item>
                        <div v-if="editid && !isEdit" class="text-left">{{item.brand}}</div>
                        <a-input maxlength="50" v-else v-decorator="[`sample[${index}].brand`, {rules: [{ required: false}],initialValue:item.brand}]" placeholder="请输入"/>
                    </a-form-item>
                </td>
                <td class="input-td">
                    <a-form-item>
                        <div v-if="editid && !isEdit" class="text-left">{{item.specimen}}</div>
                        <a-input v-else v-decorator="[`sample[${index}].specimen`, {rules: [{ required: false}],initialValue:item.specimen}]" readOnly="true"/>
                    </a-form-item>
                </td>
                <td class="input-td" hidden>
                    <a-form-item>
                        <a-input v-decorator="[`sample[${index}].id`,{rules: [{ required: false}],initialValue:item.id}]"/>
                    </a-form-item>
                </td>
            </tr>
            <tr>
                <td colspan="2">承检项目</td>
                <td colspan="5" class="text-left radio-td">
                  <span v-for="(item,index) in commodityInfoList" :key="index">{{item.commodityName}}、</span>
                  <span v-if="imprintArray.length">加印报告</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">检验类型</td>
                <td colspan="2" class="text-left radio-td">
                    <a-form-item><a-radio-group :options="type" v-decorator="['type', {rules: [{ required: true, message: '请选择检验类型' }],initialValue:returnProxy.type}]" /> </a-form-item>
                </td>
                <td>检验依据</td>
                <td colspan="2" class="text-left radio-td">
                    <a-form-item><a-radio-group :options="basis" v-decorator="['basis', {rules: [{ required: true, message: '请选择检验依据' }],initialValue:returnProxy.basis}]" /> </a-form-item>
                </td>
            </tr>
            <tr>
                <td colspan="2">检验结果评定</td>
                <td colspan="2" class="text-left radio-td">
                    <a-form-item><a-radio-group :options="isEvaluate" v-decorator="['isEvaluate', {rules: [{ required: true, message: '请选择检验结果评定' }],initialValue:returnProxy.isEvaluate}]" /> </a-form-item>
                </td>
                <td>退还样品</td>
                <td colspan="2" class="text-left radio-td">
                    <a-form-item><a-radio-group :options="isRefund" v-decorator="['isRefund', {rules: [{ required: true, message: '请选择是否退还样品' }],initialValue:returnProxy.isRefund}]" /> </a-form-item>
                </td>
            </tr>
            <tr>
                <td colspan="2">领取报告方式</td>
                <td colspan="2" class="text-left radio-td">
                    <a-form-item><a-radio-group :options="sendReport" v-decorator="['sendReport', {rules: [{ required: true, message: '请选择领取报告方式' }],initialValue:returnProxy.sendReport}]" /> </a-form-item>
                </td>
                <td>加印报告份数</td>
                <td colspan="2" class="text-left" style="background: #F7F6F6;color: #9A9A9A;" v-if="imprintReport>0"> {{imprintReport}}份 </td>
                <td colspan="2" class="text-left" style="background: #F7F6F6;color: #9A9A9A;" v-else> 0 </td>
            </tr>
            <tr>
                <td>备注</td>
                <td colspan="6">
                  <a-form-item><a-textarea maxlength="999" placeholder="如需发票请备注写清楚（发票信息）" v-decorator="['remarks', {rules: [{ required: true, message: '请填写备注' }],initialValue:returnProxy.remarks}]" /></a-form-item>
                </td>
            </tr>
            <tr v-if="editid" class="edit-btn-box">
                <td colspan="7">
                    <a-button v-if="!isEdit" @click="isEdit = true" size="small">修改</a-button>
                    <a-button v-if="isEdit" @click="save" size="small">保存</a-button>
                    <!-- <a-button size="small" @click="download">下载</a-button> -->
                </td>
            </tr>
        </table>
    </div>
</a-form>
</template>

<script>
import {validatePhone} from '../api/validateForm.js'
import {selectEntrust,getCommodity,getOrderDetail} from '@/service/getData'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const dateFormat = 'YYYY-MM-DD';
const teaday = moment().subtract('0','day').format(dateFormat);

export default {
    name: 'powerOfAttorney',
    props: ['id','validateForm'],
    data() {
        return {
            orderCode : this.$route.params.id,   //订单编号  orderPay页传的才是订单编号 orderConfirm页传的不是
            editid : this.id,
            isEdit : false,
            remarks: '',            //备注
            sampleNumber: '',       //样品数量  生成订单时为前端存储的count 查看时接口返回参数
            trustDate: teaday,          //委托日期
            type : [{ label: '委托', value: 0 }, { label: '仲裁', value: 1 }],
            basis : [{ label: '国际', value: 0 }, { label: '其他', value: 1 }],
            isEvaluate : [{ label: '是', value: 0 }, { label: '否', value: 1 }],
            isRefund: [{ label: '是', value: 0 }, { label: '否', value: 1 }],
            sendReport : [{ label: '自取', value: 0 }, { label: '邮寄', value: 1 }],
            commodityInfoList: [],   //生成订单接口所需商品ID
            returnProxy: '',         //查看时接口返回参数
            returnSample: [],        //查看时接口返回参数
            imprintReport: 0,       //加印报告数量
            sampleDetail: [],        //样布详情
            imprintArray: [],        //加印报告数组
            phoneRule : [
                { required: true, message: '请输入联系电话' },
                { pattern : /^1[3456789][0-9]{9}$/, message: '请输入正确联系电话' }
            ],
        }
    },
    beforeCreate () {
        this.form = this.$form.createForm(this);
    },
    methods: {
        onChange(date, dateString) {
          this.trustDate = dateString;
        },
        validatEntrustForm(type){
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.$set( values, 'trustDate', this.trustDate);
                    this.$emit('confirm',values);  // 传递表单值
                    if(type == 'edit'){
                        this.isEdit = false;
                    }
                }
            });
            if(type == 'add'){
                this.$emit('update:validateForm', false);    // 更新validateForm的值
            }
        },
        // 保存委托书修改
        save(){
            this.validatEntrustForm('edit');
        },
        download(){

        },
        getEntrust(){
          selectEntrust(this.editid).then((res) => {
             if(res && res.code == 200){
                this.returnProxy = res.data.proxy;
                this.sampleNumber = res.data.sample;
                this.trustDate = res.data.proxy.trustDate;
                for(let j=0; j<res.data.orderCommodityList.length; j++){
                  if(res.data.orderCommodityList[j].commodityName != "加印报告"){
                    this.sampleDetail.push(res.data.orderCommodityList[j]);
                  }
                }
             }
          })
        },
        getCommodityDetail(){
          for(let i=0; i<this.commodityInfoList.length; i++){
            if(this.commodityInfoList[i].commodityName != "加印报告"){
              getCommodity(this.commodityInfoList[i].id).then((res) => {
                 if(res && res.code == 200){
                   this.sampleDetail.push(res.data);
                 }
              })
            }
          }
        },
        timeRule(){
            return {
                rules: [{ required: true, message: '请选择日期' }],
                initialValue : this.trustDate && moment(this.trustDate, 'YYYY-MM-DD')
            }
        },
        getOrder(){
          getOrderDetail(this.orderCode).then((res) => {
              if(res && res.code == 200){
                this.commodityInfoList = res.data.iorder.orderCommodityList;
                if(res.data.iorder.orderCommodityList.length){
                  this.imprintReport = res.data.iorder.orderCommodityList[0].count;
                }
              }
          })
        }
    },
    watch:{
        validateForm(val, oldVal){
            if(val){
                this.validatEntrustForm('add');
            }
        }
    },
    mounted() {
        if(this.validateForm){                  //orderConfirm页
            this.validatEntrustForm('add');
        }
        if(this.editid){               //orderPay页
          if(this.orderCode){
            this.getOrder();
          }
          this.getEntrust();
          this.imprintArray = [];
          this.sampleDetail = [];
        }else{
          this.commodityInfoList = this.$store.getters.getOrderInfo.commodityInfoList;
          this.sampleNumber = this.$store.getters.getOrderInfo.sampleNumber;
          this.imprintArray = this.$store.getters.getOrderInfo.imprintArray;
          if(this.imprintArray.length){
            this.imprintReport = this.$store.getters.getOrderInfo.count;
          }
          this.getCommodityDetail();
        }
    }
}
</script>
<style scoped>
.headtb td{
    background: #F7F6F6;
    border-bottom: 1px solid #D9D9D9;
}
.attorneyTb {
    margin: 40px 0;
    border: 1px solid #d9d9d9;
}
.attorneyTb table{
    width: 100%;
}
.attorneyTb td{
    text-align: center;
    border-bottom: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
    padding: 15px 12px;
}
.attorneyTb .borderbnone td{
    border-bottom: none;
}
.attorneyTb td.text-left{
    text-align: left;
}
.attorneyTb td.text-left >>> .ant-radio-group{
    width: 100%;
}
.attorneyTb td.text-left >>> .ant-radio-wrapper{
    width: 50%;
    margin: 0;
}
.bluebg{
    background: #FAF9FE;
}
.attorneyTb tr td:last-child{
    border-right: none;
}
.attorneyTb tr:last-child td{
    border-bottom: none;
}
.attorneyTb td .ant-input{
    border: none;
    padding: 0;
    background: transparent;
    resize: none;
}
.attorneyTb td .ant-input:hover,.attorneyTb td .ant-input:active,.attorneyTb td .ant-input:focus{
    border: none;
    box-shadow: none;
    background: transparent;
}
.attorneyTb td.input-td,.attorneyTb td.radio-td{
    padding: 0px 12px;
}
.attorneyTb textarea{
    height: 60px;
}
.attorneyTb .ant-form-item{
    margin: 0;
}
.attorneyTb >>> .ant-form-item-control{
    line-height: inherit;
}
.attorneyTb .input-td >>> .ant-form-explain{
    text-align: left;
    margin-top: -8px;
    font-size: 12px;
}
.attorneyTb .radio-td >>> .ant-form-explain{
    font-size: 12px;
}
.edit-btn-box .ant-btn{
    width: 60px;
    margin: 0 20px 0;
}
</style>
