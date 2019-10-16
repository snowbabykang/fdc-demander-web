<template>
<section>
    <a-modal
        centered
        :footer="null"
        v-model="isvisible"
        :width="422"
        @cancel = "handleCancel()"
    >
      <div class="order-success-box">
          <div class="order-pay-status"><a-icon type="question-circle" theme="filled" />请确认</div>
          <div class="ordercode">订单编号：{{orderCode}}</div>
          <div>
              <a-row :gutter="30">
                  <a-col :span="12"><a-button type="primary" block ghost @click="handleConfirm">已完成支付 </a-button></a-col>
                  <a-col :span="12"><a-button type="primary" block ghost @click="handleCancel">其他支付方式 </a-button></a-col>
              </a-row>
          </div>
      </div>
    </a-modal>
</section>
</template>

<script>
export default {
    name: 'checkUnion',
    props: {
        visible: { type: Boolean, default: false },
        orderCode: ''
    },
    data() {
        return {

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
        handleCancel(){
            this.$emit('update:visible', false);    // 更新visible的值
            this.$emit('cancel');   // 传递取消事件
        },
        handleConfirm() {
            this.$router.push('/orderList');
        },
    },
}
</script>
<style scoped>
.order-success-box{
    text-align: center;
    padding: 6px;
}
.order-success-box .order-pay-status{
    font-weight: bold;
    font-size: 16px;
    color: #333;
    padding: 20px 0 14px;
}
.order-success-box .order-pay-status .anticon{
    color: #EFAF41;
    padding-right: 8px;
}
.order-success-box .ordercode{
    padding-bottom: 46px;
}
</style>
