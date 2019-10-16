<template>
  <section>
    <loading :visible="true" v-if="loadingData"></loading>
    <div id="personalCertifilcate" >
      <div>
        <ul v-for="(item,id) in datatop">
          <li @click="toggleTabs(item.value);">{{item.status}}</li>
          <span class="line" v-bind:class="{'secectBackground':flag==item.value}"></span>
          <a-divider type="vertical" v-if="id !== 9"/>
        </ul>
      </div>
      <table class="product-table" v-if="datalist.length>0">
        <thead>
          <tr>
            <td width="200" style="padding-left:10px;">
              <a-checkbox
                :indeterminate="indeterminate"
                @change="onCheckAllChange"
                :checked="checkAll"
              >全选</a-checkbox>
              <a-button @click="deleteAll()" size="small">删除</a-button>
            </td>
            <td class="td-center">实付款</td>
            <td class="td-center">交易状态</td>
            <td class="td-center">操作</td>
          </tr>
        </thead>
        <tbody v-for="(item,id) in datalist">
          <tr class="product-code">
            <td colspan="3">
              <span style="margin-right:20px;">{{item.createTime}}</span>
              <span style="margin-right:20px;">
                <span style="margin-right:10px;">订单号:</span>
                <span>{{item.orderCode}}</span>
              </span>
              <span style="margin-right:20px;">
                <span style="margin-right:10px;">店铺名称:</span>
                <span>{{item.storeName}}</span>
              </span>
            </td>
            <td @click="listDetail(item.orderCode)">
              <span
                style="width: 100%;display: inline-block;text-align: center;cursor:pointer;"
              >订单详情</span>
            </td>
          </tr>
          <tr>
            <td style="width:628px;padding-left:10px;border-right:1px solid #D9D9D9;">
              <div style="margin-bottom:14px;">
                <a-checkbox @change="onChange(id,item)" :checked="item.checked"></a-checkbox>
                <span style="padding-left:10px;">项目:</span>
                <ul>
                  <li
                    v-for="(items,index) in item.orderCommodityList"
                    :key="index"
                  >{{items.commodityName}}</li>
                </ul>
              </div>
              <span style="padding-left:34px;">
                <span>样品数量:</span>
                <span>{{item.sampleNumber}}</span>
              </span>
              <span style="padding-left:30px;">
                <!-- <span>交期:</span>
                <span>{{item.isUrgent}}</span>-->
                <span style="margin-left: 24px;" v-if="item.isUrgent==0">交期：常规</span>
                <span style="margin-left: 24px;" v-if="item.isUrgent==1">交期：加急</span>
              </span>
            </td>
            <td style="width:173px;padding:0;border-right:1px solid #D9D9D9;">
              <div style="text-align:center;">¥{{item.totalPrices}}</div>
            </td>
            <!-- <td style="width:173px;border-right:1px solid #D9D9D9;padding:0;" v-if="item.status==1"> -->
            <td style="width:173px;border-right:1px solid #D9D9D9;padding:0;" v-if="item.typeId==1">
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  style="color:#E6212B;"
                >待付款</a>
              </div>
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="cancelorder(item.orderCode)"
                >取消订单</a>
              </div>
            </td>
            <td
              style="width:173px;border-right:1px solid #D9D9D9;padding:0;"
              v-else-if="item.typeId==2"
            >
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="deleteProduct(item.id)"
                  style="color:#999999;"
                >已付款</a>
              </div>
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="cancelorder(item.orderCode)"
                >取消订单</a>
              </div>
            </td>
            <td
              style="width:173px;border-right:1px solid #D9D9D9;padding:0;"
              v-else-if="item.typeId==3"
            >
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="express(2,item.orderCode)"
                  style="color:#999999;"
                >已寄样</a>
              </div>
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="deleteProduct(item.id)"
                  v-if="item.typeId==3 && item.sendType == 0"
                >亲自送样</a>
              </div>
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="express(3,item.orderCode)"
                  v-if="item.typeId==3 && item.sendType == 1"
                >寄件物流</a>
              </div>
            </td>
            <td
              style="width:173px;border-right:1px solid #D9D9D9;padding:0;"
              v-else-if="item.typeId==4"
            >
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="deleteProduct(item.id)"
                  style="color:#999999;"
                >已收样</a>
              </div>
            </td>
            <td
              style="width:173px;border-right:1px solid #D9D9D9;padding:0;"
              v-else-if="item.typeId==5"
            >
              <div style="text-align:center;">
                <a href="javascript:void(0);" class="btn-link" @click="deleteProduct(item.id)">检测中</a>
              </div>
            </td>
            <td
              style="width:173px;border-right:1px solid #D9D9D9;padding:0;"
              v-else-if="item.typeId==6"
            >
              <div style="text-align:center;">
                <a href="javascript:void(0);" class="btn-link" @click="deleteProduct(item.id)">检测完成</a>
              </div>
            </td>
            <td
              style="width:173px;border-right:1px solid #D9D9D9;padding:0;"
              v-else-if="item.typeId==7"
            >
              <div style="text-align:center;">
                <a href="javascript:void(0);" class="btn-link" @click="deleteProduct(item.id)">待收货</a>
              </div>
              <div style="text-align:center;">
                <a href="javascript:void(0);" class="btn-link" @click="express(4,item.orderCode)">检测物流</a>
              </div>
            </td>
            <td
              style="width:173px;border-right:1px solid #D9D9D9;padding:0;"
              v-else-if="item.typeId==8"
            >
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="deleteProduct(item.id)"
                  style="color:#999999;"
                >已完成</a>
              </div>
            </td>
            <td
              style="width:173px;border-right:1px solid #D9D9D9;padding:0;"
              v-else-if="item.typeId==9"
            >
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="deleteProduct(item.id)"
                  style="color:#999999;"
                >已取消</a>
              </div>
            </td>
            <td
              style="width:173px;border-right:1px solid #D9D9D9;padding:0;"
              v-else-if="item.typeId==null"
            >
              <div style="text-align:center;"></div>
            </td>

            <td style="width:173px;padding:0;" v-if="item.typeId==1">
              <!-- <td style="width:173px;padding:0;" v-if="item.typeId==null"> -->
              <div style="text-align:center;">
                <button
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="confirmPay(item.orderCode)"
                  style="background-color:white;color:#E6212B;outline:none;border:1px solid #E6212B;"
                >去付款</button>
              </div>
            </td>
            <td style="width:173px;padding:0;" v-else-if="item.typeId==2">
              <div style="text-align:center;">
                <button
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="sendExpress(item.orderCode)"
                  style="background-color:white;color:#2300A8;outline:none;border:1px solid #2300A8;"
                >寄样</button>
              </div>
              <div style="text-align:center;">
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="downloadEntrust(item.orderCode)"
                  style="color:black;"
                >一键下载委托书</a>
              </div>
            </td>
            <td style="width:173px;padding:0;" v-else-if="item.typeId==6">
              <div style="text-align:center;">
                <button
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="downloadDetection(item.id)"
                  style="background-color:white;color:#2300A8;outline:none;border:1px solid #2300A8;"
                >下载报告单</button>
              </div>
            </td>
            <td style="width:173px;padding:0;" v-else-if="item.typeId==7">
              <div style="text-align:center;">
                <button
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="confirmReorder(item.orderCode)"
                  style="background-color:white;color:#E6212B;outline:none;border:1px solid #E6212B;"
                >确认收货</button>
              </div>
            </td>
            <td style="width:173px;padding:0;" v-else></td>
          </tr>
        </tbody>
      </table>

      <noData v-else/>

      <div class="pagination-box" v-if="datalist.length>0">
        <a-pagination
          :current="current"
          :total="total"
          :showTotal="total => `共 ${total} 条数据`"
          @change="onChangePage"
        ></a-pagination>
      </div>
    </div>
    <cancelOrder
      :visible.sync="cancelOrderVisible"
      :orderCode="orderCode"
      @confirm="confirmCancelOrder"
      @delateOrder="delateOrder()"
    ></cancelOrder>
    <entrustModal :visible.sync="entrustVisible" @confirm="downloadEntrust()"></entrustModal>
    <expressModal
      :visible.sync="expressVisible"
      :orderCode="orderCode"
      :operation="expressOpt"
      :orderright="orderright"
      @expresssave="expresssave()"
    ></expressModal>
    <paySuccess
       :visible.sync="successVisible"
       :footer="null"
       :width="422"
       :orderCode="orderCode"
       @cancel="handleCancel()"
       @sendByPerson="sendByPerson()"
       @sendByExpress="sendByExpress()">
    </paySuccess>
    <confirmSend
       :visible.sync="confirmSendVisible"
       :orderCode="orderCode"
       @confirmSendOk="confirmSendOk()">
    </confirmSend>
    <confirmReceipt :visible.sync="confirmReceiptVisible" @confirm="confirmProduct" :orderCode="orderCode" :orderright="orderInfo" @confirmReceipt="confirmReceipt()"></confirmReceipt>
    <detectionModal :visible.sync="detectionVisible"></detectionModal>
  </section>
</template>
<script>
import center from "../components/center.vue";
import paySuccess from '../components/paySuccess'     //支付成功
import cancelOrder from "../components/cancelOrder";
import entrustModal from "../components/entrustModal";
import expressModal from "../components/expressModal";
import confirmReceipt from "../components/confirmReceipt";
import detectionModal from "../components/detectionModal";
import confirmSend from '../components/confirmSend';
import loading from '../components/loading';          //loading
import noData from '../components/noData'
import {orderStatusValue} from "../api/dictionary";
import {getiorderList,getcreateIorder,deleteOrder,deleteIorder,iorderParticulars,downLoadReport,iorderOk,showEntrust,downEntrust} from "@/service/getData";
let valuess = "";
export default {
  data() {
    return {
      searchtype: "1",
      searchinfo: "",
      indeterminate: false,
      checkAll: false,
      checkedList: [],
      flag: "",
      orderCode: "",
      current: 1,
      successVisible: false,
      cancelOrderVisible: false,
      entrustVisible: false,
      expressVisible: false,
      expressOpt: "", //1=填写   2=修改   3=查看物流
      confirmReceiptVisible: false,
      detectionVisible: false,
      orderStatusValue: orderStatusValue,
      datatop: [
        { id: 0, status: "全部订单", value: "" },
        { id: 1, status: "待付款", value: 1 },
        { id: 2, status: "已付款", value: 2 },
        { id: 3, status: "已寄样", value: 3 },
        { id: 4, status: "已收样", value: 4 },
        { id: 5, status: "检测中", value: 5 },
        { id: 6, status: "检测完成", value: 6 },
        { id: 7, status: "待收货", value: 7 },
        { id: 8, status: "已完成", value: 8 },
        { id: 9, status: "已取消", value: 9 }
      ],
      datalist: [],
      typeId: "",
      total: 0,
      orderright: '',
      orderInfo: '',
      successVisible: false,
      confirmSendVisible: false,
      loadingData: true,
    };
  },
  components: {
    center,
    cancelOrder,
    entrustModal,
    expressModal,
    confirmReceipt,
    detectionModal,
    paySuccess,
    confirmSend,
    loading,
    noData
  },
  methods: {
    // 搜索
    search() {
      console.log(this.searchtype);
      console.log(this.searchinfo);
    },
    delateOrder() {
      this.current = 1;
      // this.flag = "";
      this.onChangePage(this.current, this.flag);
    },
    expresssave() {
      this.current = 1;
      // this.flag = "";
      this.onChangePage(this.current, this.flag);
    },
    confirmReceipt(){
      this.confirmReceiptVisible = false;
      this.current = 1;
      this.onChangePage(this.current, this.flag);
    },
    listDetail(id) {
      this.$router.push("/orderDetail/" + id);
    },
    confirmPay(orderCode) {
      this.$router.push("/orderpay/" + orderCode);
    },
    sendExpress(orderCode){
      this.orderCode = orderCode;
      this.successVisible = true;
    },
    sendByPerson(){
      this.confirmSendVisible = true;
    },
    sendByExpress(){
      this.successVisible = false;
      this.express(1, this.orderCode);
    },
    handleCancel(){
      this.successVisible = false;
      this.onChangePage(this.current, this.flag);
    },
    confirmSendOk(){
      this.successVisible = false;
      this.onChangePage(this.current, this.flag);
    },
    // 取消订单
    cancelorder(orderCode) {
      this.cancelOrderVisible = true;
      this.orderCode = orderCode;
    },
    confirmCancelOrder(cancelReason) {
      console.log("取消订单理由" + cancelReason);
    },
    // 查看委托书
    showEntrust(orderCode) {
      this.orderCode = orderCode;
      this.entrust = showEntrust(orderCode);
      this.entrustVisible = true;
    },
    downloadEntrust(orderCode) {
      console.log('下载委托书');
      this.orderCode = orderCode;
      window.open(downEntrust(this.orderCode));
    },
    deleteIorder() {
      deleteIorder(that.checkedList).then(res => {
        if (res && res.code == 200) {
          that.$message.success("删除成功");
          that.current = 1;
          that.flag = "";
          that.onChangePage(that.current, that.flag);
        }
      });
    },
    // 快递寄样
    express(type, orderCode) {
      this.expressVisible = true;
      this.expressOpt = type;
      this.orderCode = orderCode;
      if (type == 2 || type == 3 || type == 4) {
        this.orderDetail(orderCode);
      }
    },
    //订单详情
    orderDetail(orderCode) {
      iorderParticulars(orderCode).then(res => {
        if (res && res.code == 200) {
          if(res.data.expressList && res.data.iorder.orderCommodityList){
            this.orderright = res.data.expressList;
            this.orderInfo = {
              commodityInfoList:res.data.iorder.orderCommodityList,
              sampleNumber:res.data.iorder.sampleNumber,
              isUrgent:res.data.iorder.isUrgent,
            }
          }
        }
      });
    },
    // 确认收货
    confirmReorder(orderCode) {
      this.confirmReceiptVisible = true;
      this.orderCode = orderCode;
      this.orderDetail(orderCode);
    },
    confirmProduct() {
      console.log("确认收货返回");
    },
    // 下载报告单
    downloadDetection(id) {
    //  this.detectionVisible = true;
      window.open(downLoadReport(id,this.$store.getters.getToken));
    },
    // 选择服务
    onChange(id, data) {
      data.checked = !data.checked;
      this.$set(this.datalist, id, data);
      if (data.checked) {
        this.checkedList.push(data.orderCode);
      } else {
        this.checkedList.splice(this.checkedList.findIndex(item => item === data.orderCode),1);
      }
      this.indeterminate = !!this.checkedList.length && this.checkedList.length < this.datalist.length;
      this.checkAll = this.checkedList.length === this.datalist.length;
    },
    // 全选
    onCheckAllChange(e) {
      Object.assign(this, {
        indeterminate: false,
        checkAll: e.target.checked
      });
      this.checkedList = [];
      if (e.target.checked) {
        this.datalist.forEach(data => {
          data.checked = true;
          this.checkedList.push(data.orderCode);
        });
      } else {
        this.datalist.forEach(data => {
          data.checked = false;
        });
        this.checkedList = [];
      }
    },
    // 全选删除
    deleteAll() {
      let that = this;
      this.$confirm({
        title: "确认删除？",
        onOk() {
          deleteOrder(that.checkedList).then(res => {
            if (res && res.code == 200) {
              that.$message.success("删除成功");
              that.current = 1;
              that.flag = valuess;
              that.onChangePage(that.current, that.flag);
            }
          });
        }
      });
    },
    deleteProduct(id) {
      console.log(id);
    },
    // 设置序号首页推荐位
    onChangeNum(num, id) {
      console.log("第" + id + "条数据值为" + num);
    },
    // 设置序号首页推荐位 简介
    showIntroduce() {},
    toggleTabs(value) {
      this.flag = value;
      this.current = 1;
      valuess = value;
      this.onChangePage(this.current, this.flag);
    },
    // 分页
    onChangePage(current, flag) {
      this.current = current;
      this.getOrderList(valuess, this.current, 10);
    },
    getOrderList(typeId, pageNum, pageSize) {
      getiorderList(typeId, pageNum, pageSize).then(res => {
        if (res && res.code == 200) {
          if(res.data.iorder){
            this.loadingData = false;
            this.datalist = res.data.iorder;
            this.total = res.data.count;
            this.current = pageNum;
          }else{
            this.loadingData = false;
            this.datalist = [];
          }
        }
      });
    },
  },
  mounted() {
    this.current = 1;
    this.flag = "";
    valuess = "";
    this.onChangePage(this.current, this.flag);

  }
};
</script>
<style scoped>
ul,
li {
  padding: 0;
  margin: 0;
  display: inline-block;
}
ul {
  position: relative;
  height: 30px;
  margin-bottom: 16px;
}
.secectBackground {
  border-bottom: 2px solid #e6212b;
  color: #e6212b;
  width: 22px;
  position: absolute;
  bottom: 0;
  left: 35px;
}
li {
  width: 90px;
  text-align: center;
  cursor: pointer;
}
li:hover + .line {
  border-bottom: 2px solid #e6212b;
  color: #e6212b;
  width: 22px;
  position: absolute;
  bottom: 0;
  left: 35px;
}
thead {
  width: 1150px;
  height: 40px;
}
.myTab .ant-tabs-tab {
  margin: 0;
  padding: 0;
}
#personalCertifilcate {
  font-size: 14px;
  margin-bottom: 254px;
  padding: 28px 26px 20px 24px;
  background: white;
}
.alertinfo {
  margin: 32px 0 12px;
}
.product-table {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.product-table thead {
  background: rgba(232, 232, 232, 1);
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
}
.product-table tr td:first-child {
  padding-left: 32px;
}
.product-table td {
  padding: 22px 16px 22px 0;
}
.product-table thead td,
.product-code td {
  height: 38px;
  padding: 0 16px 0;
}
.product-code td {
  background: rgba(243, 243, 243, 1);
  border-top: 1px solid #e8e8e8;
}
.ant-pagination {
  float: right;
  margin-top: 21px;
}
.product-name {
  display: inline-block;
  height: 24px;
  background: rgba(243, 243, 243, 1);
  border-radius: 2px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
  padding: 4px 5px;
}
.btn-link {
  color: black;
}
td div:nth-child(2) {
  margin-top: 10px;
}
thead tr .td-center {
  text-align: center;
}
.elsebox{
  height: 800px;
  position: relative;
}
.elsebox >>> .ant-spin{
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
