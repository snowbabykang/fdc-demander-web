<!-- 支付成功modal -->
<template>
    <section>
      <a-modal v-model="isvisible" :footer="null" :width="422" @cancel="handleCancel()">
        <div class="order-success-box">
            <div class="order-pay-status"><a-icon type="check-circle" theme="filled" />支付成功</div>
            <div class="ordercode">订单编号：{{orderCode}}</div>
            <div>
                <a-row :gutter="30">
                    <a-col :span="12"><a-button type="primary" block ghost @click="sendByPerson()">亲自送样（含委托书）</a-button></a-col>
                    <a-col :span="12"><a-button type="primary" block ghost @click="sendByExpress()">快递送样（含委托书）</a-button></a-col>
                </a-row>
            </div>
        </div>
      </a-modal>
    </section>
</template>

<script>
export default {
    name: 'paySuccess',
    props: {
        visible: { type: Boolean, default: false },
        orderCode:{ type: String, default: ''  },
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
          this.$emit("cancel"); // 传递取消事件
        },
        sendByPerson(){
            this.$emit('sendByPerson');
        },
        sendByExpress(){
            this.$emit('sendByExpress');
        }
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
    color: #52C41A;
    padding-right: 8px;
}
.order-success-box .ordercode{
    padding-bottom: 46px;
}
</style>
