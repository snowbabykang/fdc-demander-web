<template>
    <section>
        <a-modal
            centered
            class="sourceImgModal"
            :closable = "false"
            :footer="null"
            v-model="isvisible"
            :width="362"
            @cancel = "handleCancel()"
        >
            <div class="detectionBox">
                <div class="title">个人认证 <span @click="handleCancel()"><a-icon type="close" /></span> </div>
                <a-form :form="form" @submit="handleSubmit">
                  <a-form-item label="姓名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input maxlength="50" v-decorator="['name',{rules: [{ required: true, message: '请输入姓名' }]}]" placeholder="请输入"/>
                  </a-form-item>
                  <a-form-item label="身份证号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-decorator="['identityCode',{rules: noTextByID}]" placeholder="请输入"/>
                  </a-form-item>
                  <a-form-item label="银行卡号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input minlength="10" maxlength="30" v-decorator="['bankAcount',{rules: cardRule}]" placeholder="请输入"/>
                  </a-form-item>
                  <a-form-item label="预留手机" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-decorator="['reservedPhone',{rules: phoneRule}]" placeholder="请输入"/>
                  </a-form-item>
                  <a-form-item :wrapper-col="{ span: 12, offset: 9 }">
                    <a-button type="primary" html-type="submit">
                      提交认证
                    </a-button>
                  </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </section>
</template>

<script>
import {attestationNo} from '@/service/getData'
import { validateIDcard } from "../api/validateForm.js"
export default {
    name: 'sourceImgModal',
    props: {
        visible: { type: Boolean, default: false },
    },
    data() {
        return {
          formLayout: 'horizontal',
          form: this.$form.createForm(this),
          phoneRule : [
              { required: true, message: '请填写预留手机' },
              { pattern : /^1[3456789][0-9]{9}$/, message: '请填写正确预留手机' }
          ],
          cardRule : [
              { required: true, message: '请填写银行卡号' },
              { pattern : /^\d{10,30}$/, message: '请输入10-30位的数字'}
          ],
          noTextByID : [
              { required: true, message: '请填写身份证号' },
              { validator: this.validateIDcardRule }
          ],
        };
    },
    computed : {         //点击背景阴影隐藏model
        isvisible : {
            get: function () {
                return this.visible;
            },
            set: function () {

            }
        }
    },
    methods: {
      validateIDcardRule(rule, value, callback) {
          const form = this.form;
          if (value) {
            let msg = validateIDcard(value);
            if (msg) {
              callback(msg);
            } else {
              callback();
            }
          }
          callback();
        },
        handleSubmit (e) {
          e.preventDefault();
          this.form.validateFields((err, values) => {
            if (!err) {
              attestationNo(values.bankAcount,values.identityCode,values.name,values.reservedPhone).then((res) => {
                 if(res && res.code == 200){
                   this.handleCancel();
                   this.$emit('confirm',true);
                 }else{
                   this.$emit('confirm',false);
                 }
              });
            }
          });
        },
        handleCancel(){
            this.$emit('update:visible', false);    // 更新visible的值
        },
    },
}
</script>
<style type="text/css">
.sourceImgModal .ant-modal-body{
    padding: 0;
}
</style>
<style scoped>
.detectionBox{
    width: 100%;
    height: 420px;
    background: #fff;
}
.title{
  display: flex;
  width: 100%;
  padding: 0 18px 0px 30px;
  line-height: 50px;
  background:rgba(250,250,250,1);
  justify-content: space-between;
}
.ant-form{
  padding: 30px;
}
</style>
