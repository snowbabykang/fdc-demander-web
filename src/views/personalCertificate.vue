<template>
  <div id="personalCertifilcate">
    <div class="personal-title" v-if="show">个人认证</div>
    <div class="personal-title" v-else>
      <span class="geren">个人认证</span>
      <a-icon style="color:green;" type="check-circle"/>
      <span class="geren-success">成功</span>
    </div>
    <a-form :form="form" @submit="handleSubmit" v-if="show">
      <a-form-item
        label="姓名"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 12 }"
        
      >
        <a-input  maxlength="50"
          v-decorator="[
          'name',
          {rules: [{ required: true, message: '请输入姓名！' }]} 
        ]"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item
        label="身份证号"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 12 }"
        
      >
        <a-input
          v-decorator="[
          'idcard',
          //{rules: [{ required: true, message: '请输入身份证号！'},{ pattern : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请填写正确身份证号！' },]},
          idcardRules
        ]"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item
        label="银行卡号"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
          'bankcard',
          {rules: [{ required: true, message: '请输入银行卡号！' },{pattern : /^\d{10,30}$/, message: '请输入10-30位的数字'}]}
        ]"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item
        label="预留手机"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
          'phonenum',
          //{rules: [{ required: true, message: '请输入手机号！'},{ pattern : /^1[3456789][0-9]{9}$/, message: '请填写正确手机号!' },]},
          phoneRules
        ]"
          placeholder="填写的银行卡的预留手机号"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          :disabled="hasErrors(form.getFieldsError())"
          type="primary"
          html-type="submit"
        >提交认证</a-button>
      </a-form-item>
    </a-form>
    <a-form v-else>
      <a-form-item label="姓名" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
        <span
        >{{item.name}}</span>
      </a-form-item>
      <a-form-item label="身份证号" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
        <span
        >{{item.identityCode}}</span>
      </a-form-item>
      <a-form-item label="银行卡号" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
        <span
        >{{item.bankAcount}}</span>
      </a-form-item>
      <a-form-item label="预留手机" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
        <span
        >{{item.reservedPhone}}</span>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import center from "../components/center.vue";
import { validatePhone, validateIDcard } from "../api/validateForm.js";
import { attestationNo, attestationYes } from "@/service/getData";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      btnShow: false,
      show: true,
      item: {},
      hasErrors,
      phoneRules: {
        rules: [
          { required: true, message: "请填写正确手机号" },
          { validator: this.validatePhoneval }
        ]
      },
      idcardRules: {
        rules: [
          { required: true, message: "请输入正确的身份证号" },
          { validator: this.validateIDcardRule }
        ]
      },
    };
  },
  components: { center },
  methods: {
    validatePhoneval(rule, value, callback) {
      const form = this.form;
      if (value) {
        let errormsg = validatePhone(value);
        if (errormsg) {
          callback(errormsg);
        } else {
          callback();
        }
      }
      callback();
    },
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
    attestation(bankAcount, identityCode, name, reservedPhone) {
      attestationNo(bankAcount, identityCode, name, reservedPhone).then(res => {
        if (res && res.code == 200) {
          this.attesta();
        }
      });
    },
    attesta() {
      attestationYes().then(res => {
        if (res && res.code == 200) {
          if (res.data != null) {
            if (res.data.flag == 1) {
              this.show = false;
              var item = res.data;
              this.item = item;
            }
          }else{
            this.$nextTick(() => {
              this.form.validateFields();
            });
          }
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.attestation(
            values.bankcard,
            values.idcard,
            values.name,
            values.phonenum
          );
        }
      });
    },
    error(message) {
      this.$error({
        title: "认证失败",
        content: message
      });
    }
  },
  mounted() {
    this.attesta();
  }
};
</script>

<style scoped>
.ant-form {
  margin-left: 30px;
  width: 1006px;
  display: inline-block;
}
.ant-row {
  width: 1006px;
  margin-top: 30px;
  margin-bottom: 4px;
}
#personalCertifilcate {
  width: 1006px;
  display: inline-block;
  float: left;
  margin-left: 20px;
  font-size: 14px;
  margin-bottom: 254px;
  height: 620px;
  background: white;
}
#personalCertifilcate .ant-input {
  width: 224px;
  height: 32px;
  float: left;
}
.personal {
  margin-left: 30px;
  width: 1006px;
}
.personal div {
  margin-top: 30px;
  margin-bottom: 4px;
  height: 32px;
}
.personal span {
  float: left;
  height: 32px;
  line-height: 32px;
  text-align: right;
}
.list {
  width: 70px;
}
.personal-title {
  height: 50px;
  width: 1006px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  text-align: left;
  padding-left: 30px;
  line-height: 50px;
  font-size: 16px;
  background-color: rgba(250, 250, 250, 1);
}
.ant-btn {
  height: 40px;
  width: 88px;
  margin-left: 459px;
  margin-top: 68px;
}
.geren {
  margin-right: 28px;
}
.geren-success {
  margin-left: 8px;
  color: #52c41a;
}
.ant-form span {
  margin-left: 15px;
}
</style>