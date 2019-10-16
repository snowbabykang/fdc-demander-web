<template>
  <div id="personalCertifilcate">
    <div class="personal-title">收货地址</div>
    <div class="personal-title1">新增收货地址</div>
    <adressPart @addr="addr()"/>
    <div>
      <div class="personal-title2">管理收货地址</div>
      <div class="adress-wai">
        <a-table
          bordered
          :columns="columns"
          :dataSource="data"
          :rowKey="record => record.id"
          :pagination="false"
          :loading="loading"
        >
          <span slot="phone" slot-scope="record">
              {{record.contactPhone || record.contactTel}}
          </span>
          <span slot="typeId" slot-scope="typeId">
            <div style="text-align:center;color:#2300A8;">{{statusArr[typeId]}}</div>
          </span>
          <span slot="operation" slot-scope="text, record">
            <span
              style="text-align:center;cursor: pointer;color:#2300A8;"
              @click="editAddr(record.id)"
            >修改</span>
            <a-divider type="vertical"/>
            <span
              style="text-align:center;cursor: pointer;color:#2300A8;"
              @click="deleteAddr(record.id)"
            >删除</span>
          </span>
        </a-table>
      </div>
    </div>
    <editAddress :visible.sync="visible" :id="editAddrId" @confirm="handleSave()"></editAddress>
  </div>
</template>

<script>
import center from "../components/center.vue";

import centerEditableCell from "../components/centerEditableCell.vue";
import adressPart from "../components/adressPart";
import editAddress from "../components/editAddress";
import {
  getAddresslist,
  delAddressinfo,
  setAddrDefault
} from "@/service/getData";
let data = [];
export default {
  data() {
    return {
      data,
      visible: false, //新建编辑地址
      editAddrId: "", //编辑地址id
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      modal1Visible: false,
      modal2Visible: false,
      btnShow: false,
      addrlist: [],
      loading: false,
      statusArr: { 0: "默认地址", 1: "-" },
      isValidate: false,
      count: 2,
      columns: [
        {
          title: "收货人",
          dataIndex: "contactName"
        },
        {
          title: "所在地区",
          customRender: (text, record) => {
            const addrs = `${record.provinceName}${record.cityName}${
              record.areaName
            }`;
            return addrs;
          }
        },
        {
          title: "详细地址",
          dataIndex: "detailAddress"
        },
        {
          title: "邮编",
          dataIndex: "postCode"
        },
        {
          title: "手机/电话",
          key: "phone",
          scopedSlots: { customRender: 'phone' }
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        },
        {
          title: "默认地址",
          dataIndex: "typeId",
          scopedSlots: { customRender: "typeId" },
          className: "column-address"
        }
      ]
    };
  },
  components: { center, centerEditableCell, adressPart, editAddress },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    addr() {
      this.getAddrList();
    },
    getAddrList() {
      getAddresslist().then(res => {
        this.loading = true;
        if (res && res.code == 200) {
          this.loading = false;
          this.data = res.data;
          console.log(this.data);
        }
      });
    },
    handleSave() {
      this.getAddrList();
    },
    getInputValue() {
      if (this.two.length >= 1 && this.one.length >= 1) {
        this.btnShow = true;
      } else {
        this.btnShow = false;
      }
    },
    editAddr(id) {
      this.visible = true;
      this.editAddrId = id;
      console.log(this.editAddrId);
    },
    deleteAddr(id) {
      console.log(id);
      let that = this;
      this.$confirm({
        title: "确定删除该地址吗?",
        onOk() {
          delAddressinfo(id).then(res => {
            if (res && res.code == 200) {
              that.$message.success("删除成功");
              that.getAddrList();
            }
          });
        }
      });
    }
  },
  mounted() {
    console.log("订单ID=" + this.orderid);
    this.getAddrList();
  }
};
</script>

<style scoped>
.column-address {
  text-align: center;
  color: blue;
}
.adress-wai {
  padding-left: 32px;
  padding-right: 64px;
  padding-bottom: 40px;
}
.ant-modal .ant-modal-content {
  width: 886px !important;
  height: 654px;
}
.ant-table table td {
  text-align: center;
}
.standardTable:globle > .ant-table-thead > tr > th {
  text-align: center;
}

.ant-table-tbody > tr > td {
  text-align: center;
}
.ant-modal-content input,
.ant-modal-content textarea {
  width: 160px;
  font-size: 12px;
}
.ant-modal-content label {
  font-size: 12px;
}
#personalCertifilcate {
  width: 1006px;
  display: inline-block;
  float: left;
  margin-left: 20px;
  font-size: 14px;
  margin-bottom: 254px;
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
  margin-left: 216px;
}
.ant-checkbox-wrapper {
  margin-top: 30px;
}
.personal-title1,
.personal-title2 {
  margin-top: 30px;
  margin-left: 32px;
}
.personal .ant-row {
  width: 1006px;
}
.personal-title2 {
  margin-bottom: 20px;
  font-weight: bold;
}
.personal-title1 {
  font-weight: bold;
}
.form-item-label-left .ant-form-item-label {
  text-align: left;
}
thead tr th {
  text-align: center;
  border: 1px solid #d9d9d9;
  height: 45px;
}
tbody tr td {
  text-align: center;
  border: 1px solid #d9d9d9;
}
tbody tr td {
  padding: 10px;
}
thead {
  border-right: 1px solid #d9d9d9;
  background-color: RGBA(250, 250, 250, 1);
}
.td-center {
  width: 173px;
}
</style>