<template>
<section class="quality-content">
        <!-- <a-form :form="form" @submit="handleSubmit" class="form-item-label-left"> -->
            <a-form :form="form" class="form-item-label-left">
            <section class="quality-item-box">
                <section class="quality-item-box-dis">
                <a-form-item v-bind="{labelCol: { span: 4 }, wrapperCol: { span: 20 }, }" label="所在地区">
                    <selectArea :addr="addrSelected" @selectedArea="selectedArea" v-decorator="['address', {type: 'object',rules: [{ required: true, message: '请选择所在地区' }] , initialValue : initval.address} ]"></selectArea>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="详细地址">
                    <a-textarea maxlength="50" v-decorator="['detailAddress', {rules: [{ required: true, message: '请输入详细地址' }],initialValue : initval.detailAddress} ]" placeholder="请输入" :row="3"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="邮政编码">
                    <a-input v-decorator="['postCode',{initialValue : initval.postCode} ]" placeholder="请输入"  maxlength="6"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="收货人姓名">
                    <a-input v-decorator="['contactName',{initialValue : initval.contactName} ]" placeholder="请输入" maxlength="25"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="手机号码">
                    <a-input v-decorator="['contactPhone' , {rules: [
                        { required: phoneValidate, message: '手机号或电话号码至少填一个' },
                        { pattern : /^1[3456789][0-9]{9}$/, message: '请填写正确手机号' },
                    ],initialValue : initval.contactPhone}]" placeholder="请输入" @blur="checkphone"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="电话号码">
                    <a-input v-decorator="['contactTel',{rules: [{ required: telValidate, message: '手机号或电话号码至少填一个' }] ,initialValue : initval.contactTel}]" placeholder="请输入"  @blur="checkphone" maxlength="11"/>
                </a-form-item>
                <a-form-item class="clause-box" :wrapper-col="wrapperCol">
                    <a-checkbox v-decorator="['typeId',{valuePropName: 'checked',initialValue : initval.typeId}]">设置为默认收货地址</a-checkbox>
                </a-form-item>
                <a-form-item :wrapper-col="wrapperCol">
                     <a-button type="primary" @click="handleSubmit">保存</a-button>
                </a-form-item>
    </section>
    </section>
  </a-form>
  </section>
</template>
<script>
import selectArea from '../components/selectArea'
// import submitSuccessModal from '../components/submitSuccessModal'
import {getAddressinfo, editAddressinfo} from '@/service/getData'
// export default {
//     name: 'editAddress',
//     props: {
//         visible: { type: Boolean, default: false },   
//         id: { default: '' },   
//     },
//     components: {
//         selectArea
//     },
//     data() {
//         return {
//             formItemLayout: {
//                 labelCol: { span: 4 },
//                 wrapperCol: { span: 12 },
//             },
//             wrapperCol : { span: 12, offset: 4 },
//             // addressRules : {type: 'object',rules: [{ required: true, message: '请选择所在地区' }]},
//             // addrDetailRules : {rules: [{ required: true, message: '请输入详细地址' }]},
//             phoneValidate : true,
//             telValidate : true,
//             addrSelected : {},
//             initval : {  },       //初始值，新建就是空，编辑就是当前地址的值
//         };
//     },
//     beforeCreate () {
//         this.form = this.$form.createForm(this);
//     },
//     computed : {      
//         isvisible : {     //点击背景阴影隐藏model
//             get: function () {
//                 this.form.resetFields();
//                 return this.visible;
//             },
//             set: function () {

//             }
//         },
//         addrid() {
//             return this.id;
//         }
//     },
//     methods: {
//         selectedArea(data,addrtype){
//             console.log(data);
//             const { form } = this;
//             form.setFieldsValue({address : data});
//         },
//         handleCancel(){
//             this.$emit('update:visible', false);    // 更新visible的值
//             this.$emit('cancel');   // 传递取消事件
//         },
//         handleSubmit(e) {
//             console.log(this.form.getFieldsValue());
//             // return false;
//             this.form.validateFields((err, values) => {
//                 if (!err) {
//                     this.$emit('update:visible', false);    // 更新visible的值
//                     this.$emit('confirm');  // 传递确认事件
//                     console.log('Received values of form: ', values);
//                 }
//             });
//         },
//     },
// };
export default {
    name: 'editAddress',
    props: {
        visible: { type: Boolean, default: false },   
        id: { default: '' },   
    },
    components: {
        selectArea
    },
    data() {
        return {
            formItemLayout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 12 },
            },
            wrapperCol : { span: 12, offset: 4 },
            phoneValidate : true,
            telValidate : true,
            addrSelected : {},
            initval : {  },       //初始值，新建就是空，编辑就是当前地址的值
        };
    },
    beforeCreate () {
        this.form = this.$form.createForm(this);
    },
    computed : {      
        isvisible : {     //点击背景阴影隐藏model
            get: function () {
                this.form.resetFields();
                if(this.visible){
                    this.showEditinfo();
                }
                return this.visible;
            },
            set: function () {

            }
        },
        addrid() {
            return this.id;
        }
    },
    methods: {
        // 获取编辑信息，编辑新建对于表单重新赋值
        showEditinfo(){
            if(this.addrid){
                getAddressinfo(this.id).then((res) => {
                    if(res && res.code == 200){
                        this.addrSelected = {
                            province: res.data.province, 
                            city: res.data.city, 
                            area: res.data.area
                        };
                        this.initval = {       
                            address : this.addrSelected,
                            detailAddress : res.data.detailAddress,
                            postCode : res.data.postCode,
                            contactName : res.data.contactName,
                            contactPhone : res.data.contactPhone,
                            contactTel : res.data.contactTel,
                            typeId : res.data.typeId == 1 ? false : true,
                        };
                        this.phoneValidate = this.initval.contactPhone ? false : (this.initval.contactTel ? false : true);
                        this.telValidate = this.initval.contactTel ? false : (this.initval.contactPhone ? false : true);
                    }
                })
            }else{
                this.addrSelected = {province: undefined, city: undefined, area: undefined};
                this.initval = {       
                    address : this.addrSelected,
                    addrDetailRules : '',
                    postCode : '',
                    contactName : '',
                    contactPhone : '',
                    contactTel : '',
                    typeId : false,
                };   
                this.phoneValidate = true;
                this.telValidate = true;
            }
            
        },
        selectedArea(data,addrtype){
            const { form } = this;
            form.setFieldsValue({address : data});
        },
        checkphone(){
            let phone = this.form.getFieldValue('contactPhone');
            this.telValidate =  phone ? false : true;
            let mobile = this.form.getFieldValue('contactTel');
            this.phoneValidate =  mobile ? false : true;
            this.$nextTick(() => {
                this.form.validateFields(['contactPhone'], { force: true });
                this.form.validateFields(['contactTel'], { force: true });
            });
        },
        handleCancel(){
            this.$emit('update:visible', false);    // 更新visible的值
            this.$emit('cancel');   // 传递取消事件
        },
        handleSubmit(e) {
            let that = this;
            this.form.validateFields((err, values) => {
                if (!err) {
                    let addressinfo = {};
                    for(var i in values){
                        if(i == 'address'){
                            addressinfo.area = values.address.area;
                            addressinfo.city = values.address.city;
                            addressinfo.province = values.address.province;
                        }else if(i == 'typeId'){
                            addressinfo[i] = values[i] ? 0 : 1;
                        }else{
                            addressinfo[i] = values[i];
                        }
                    }
                    let method = 'POST';
                    if(this.addrid){
                        addressinfo.id = this.addrid;
                        method = 'PUT';
                    }
                    editAddressinfo(addressinfo,method).then((res) => {
                        if(res && res.code == 200){
                            that.$emit('update:visible', false);    // 更新visible的值
                            that.$emit('confirm');  // 传递确认事件
                            that.$emit('addr');
                        }
                    });
                }
            });
        },
    },
};
</script>

<style scoped>
.personal{
	width:1006px;
	
}
.personal div{
	margin-top:30px;
	margin-bottom:4px;
	height:32px;
}
.personal span{
	float: left;
	height:32px;
	line-height:32px;
	text-align: right;
}
.list{
	 width:70px;
}
.personal-title{
	height:50px;
	width:1006px;
	border-bottom:1px solid rgba(0, 0, 0, 0.15);
	text-align: left;
	padding-left:30px;
	line-height:50px;
	font-size:16px;
	background-color:rgba(250, 250, 250, 1);
}
.personal-title1,.personal-title2{
	margin-top: 30px;
	margin-left: 32px;
}
.personal .ant-row{
	width:1006px;
}
.personal-title2{
	margin-bottom:20px;
	font-weight: bold;
}
.personal-title1{
	font-weight: bold;
}
.form-item-label-left .ant-form-item-label{
    text-align: left;
}
.ant-upload-select-picture-card i {
    font-size: 24px;
    color:rgba(0,0,0,0.45);
}
.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 12px;
    color:rgba(0,0,0,0.65);
}
.submitbtnbox{
    text-align: center;
    margin-top: 64px;
}
.quality-item-box{
    border-top: 8px solid #eee;
    padding-top: 32px;
    margin-left: -32px;
    margin-right: -32px;
}
.quality-item-box-dis{
    position: relative;
    margin-top: 20px;
}
.quality-content .quality-item-box:first-child{
    border-top: none;
    padding-top: 0px;
}
.dynamic-delete-button{
    position: absolute;
    right: 32px;
    top: -10px;
    color: rgba(0,0,0,0.45);
    z-index: 100;
}
.quality-success-box{
    text-align: center;
    padding-bottom: 8px;
    padding-top: 18px;
}
.quality-success-box img{
    width: 146px;
}
.quality-success-box .message{
    font-size:16px;
    font-weight:500;
    color:rgba(0,0,0,0.65);
    margin: 24px 0 32px;
}
.quality-success-box .ant-btn{
    margin: 0 16px;
}
</style>