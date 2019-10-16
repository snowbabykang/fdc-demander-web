<template>
  <section>
    <a-modal centered :footer="null" v-model="isvisible" :width="422" :orderCode="orderCode" :orderright="orderright" @cancel="handleCancel()">
      <a-form :form="form" class="form-item-label-left expressform">
        <a-form-item
          v-bind="formItemLayout"
          :label="optType == 4 ? '检测物流号' : '寄样物流号'"
          :class="optType == 1 || (optType == 2 && isEdit) ? '' : 'margin0'"
        >
          <a-input
            v-if="optType == 1 || (optType == 2 && isEdit)"
            v-decorator="['expressNumber', {rules: [{ required: true, message: '请输入寄样物流号' },{
              pattern : /^[a-zA-z0-9]{1,30}$/ ,message: '请填写正确物流单号!'
            }],initialValue:expressList.expressNumber} ]"
            placeholder="请输入"
            maxlength="30"
          />
          <div v-else><span v-if="expressList">{{expressList.expressNumber}}</span></div>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="配送物流">
          <a-input
            v-if="optType == 1 || (optType == 2 && isEdit)"
            v-decorator="['expressCompany', {rules: [{ required: true, message: '请输入配送物流' }],initialValue:expressList.expressCompany} ]"
            placeholder="请输入"
            maxlength="30"
          />
          <div v-else><span v-if="expressList">{{expressList.expressCompany}}</span></div>
        </a-form-item>
        <div class="text-center submitbtn">
          <a-button v-if="optType > 1 && !isEdit && optType != 4" @click="update()">修改</a-button>
          <a-button
            v-if="optType == 1"
            type="primary"
            @click="handleConfirm1"
          >确认</a-button>
          <a-button
            v-if="(optType == 2 && isEdit)"
            type="primary"
            @click="handleConfirm2"
          >确认</a-button>
          <a-button v-if="optType == 3 || optType == 4" type="primary" @click="handleCancel">确认</a-button>
        </div>
      </a-form>
    </a-modal>
  </section>
</template>

<script>
import {saveExpress,updateExpress} from '@/service/getData'
export default {
  name: "expressModal",
  props: {
    visible: { type: Boolean, default: false },
    operation: {},
    orderCode:{ type: String, default: ''  },
    orderright: '',
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 }
      },
      isEdit: false,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  computed: {
    //点击背景阴影隐藏model
    isvisible: {
      get: function() {
        this.isEdit = false;
        this.form.resetFields();
        return this.visible;
      },
      set: function() {}
    },
    optType() {
      return this.operation;
    },
    expressList(){
      if(this.operation == 2 || this.operation == 3){
        for(let i=0; i<this.orderright.length; i++){
            if(this.orderright[i].flag == 0){    //flag=0为寄样物流
              return this.orderright[i];
            }
        }
      }else if(this.operation == 4){
        for(let i=0; i<this.orderright.length; i++){
            if(this.orderright[i].flag == 1){    //flag=0为检测物流
              return this.orderright[i];
            }
        }
      }else{
        return {};
      }
    }
  },
  methods: {
    handleChange() {},
    handleCancel() {
      this.$emit("update:visible", false); // 更新visible的值
      this.$emit("cancel"); // 传递取消事件
    },
    handleConfirm1(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("update:visible", false); // 更新visible的值
          this.expressSave(this.orderCode,values);
        }
      });
    },
    expressSave(orderCode,values){
      let expressNumber = values.expressNumber;
      let expressCompany = values.expressCompany;
      saveExpress(orderCode,expressNumber,expressCompany).then(res => {
          if(res && res.code == 200){
              this.$emit('expresssave');
          }
      })
    },
    handleConfirm2(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("update:visible", false); // 更新visible的值
          if(this.orderright){
            this.expressupdate(this.orderCode,values,this.orderright[0].id);
          }
        }
      });
    },
    expressupdate(orderCode,values,id){
      let expressNumber = values.expressNumber;
      let expressCompany = values.expressCompany;
      updateExpress(orderCode,expressNumber,expressCompany,id).then(res => {
          if(res && res.code == 200){
              this.$emit('expresssave');
          }
      })
    },
    update(){
      this.isEdit = true;
      this.operation = 2;
    }
  },
  mounted(){

  }
};
</script>
<style scoped>
.expressform {
  padding: 40px 0 16px;
}
.margin0 {
  margin-bottom: 0;
}
</style>
