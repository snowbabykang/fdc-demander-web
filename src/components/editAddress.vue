<!-- 新建编辑地址modal -->
<template>
    <section class="">
        <a-modal
            centered
            :footer="null"
            :width="700"
            v-model="isvisible"
            @cancel = "handleCancel()"
        >
            <div class="title">{{addrid ? '修改' : '新增'}}收货地址</div>
            <a-form :form="form" class="form-item-label-left">
                <a-form-item v-bind="{labelCol: { span: 4 }, wrapperCol: { span: 20 }, }" label="所在地区">
                    <selectArea :addr="addrSelected" @selectedArea="selectedArea" v-decorator="['address', {type: 'object',rules: [{ required: true, message: '请选择所在地区' }] , initialValue : initval.address} ]"></selectArea>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="详细地址">
                    <a-textarea maxlength="50" v-decorator="['detailAddress', {rules: [{ required: true, message: '请输入详细地址' }],initialValue : initval.detailAddress} ]" placeholder="请输入" :row="3"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="邮政编码">
                    <a-input maxlength="6" v-decorator="['postCode',{initialValue : initval.postCode} ]" placeholder="请输入"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="收货人姓名">
                    <a-input maxlength="25" v-decorator="['contactName',{initialValue : initval.contactName} ]" placeholder="请输入"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="手机号码">
                    <a-input v-decorator="['contactPhone' , {rules: [
                        { required: phoneValidate, message: '手机号或电话号码至少填一个' },
                        { pattern : /^1[3456789][0-9]{9}$/, message: '请填写正确手机号' },
                    ],initialValue : initval.contactPhone}]" placeholder="请输入" @blur="checkphone"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="电话号码">
                    <a-input maxlength="11" v-decorator="['contactTel',{rules: [{ required: telValidate, message: '手机号或电话号码至少填一个' }] ,initialValue : initval.contactTel}]" placeholder="请输入"  @blur="checkphone"/>
                </a-form-item>
                <a-form-item class="clause-box" :wrapper-col="wrapperCol">
                    <a-checkbox v-decorator="['typeId',{valuePropName: 'checked',initialValue : initval.typeId}]">设置为默认收货地址</a-checkbox>
                </a-form-item>
                <a-form-item :wrapper-col="wrapperCol">
                     <a-button type="primary" @click="handleSubmit">确定</a-button>
                     <a-button v-if="addrid" @click="handleCancel" style="margin-left: 40px;">取消</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </section>
</template>
<script>
import selectArea from '../components/selectArea'
import {getAddressinfo, editAddressinfo} from '@/service/getData'
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
                    address : undefined,
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
            console.log(this.form.getFieldsValue());
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
                        }
                    });
                }
            });
        },
    },
};
</script>
<style scoped>
.title{
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 20px;
}
</style>