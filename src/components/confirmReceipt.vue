<!-- 确认收货modal -->
<template>
    <section>
        <a-modal
            centered
            :footer="null"
            v-model="isvisible"
            :width="422"
            :orderCode="orderCode"
            :orderright="orderright"
            @cancel = "handleCancel()"
        >
            <div style="padding: 48px 0 40px;text-align: center;">
                <div class="projects" v-if="orderright">
                  <span v-for="(item,index) in orderright.commodityInfoList" :key="index">{{item.commodityName}}</span>
                </div>
                <div v-if="orderright">
                  <span>样品数量：</span>
                  <span>{{orderright.sampleNumber}}份</span>
                  <span>交期：</span>
                  <span v-if="orderright.isUrgent==0">常规</span>
                  <span v-if="orderright.isUrgent==1">加急</span>
                </div>
            </div>
            <div class="text-center submitbtn">
                <a-button type="primary" @click="handleConfirm()">确认收货</a-button>
            </div>
        </a-modal>
    </section>
</template>

<script>
import {iorderOk} from '@/service/getData'
export default {
    name: 'confirmReceipt',
    props: {
        visible: { type: Boolean, default: false },
        orderCode:{ type: String, default: ''  },
        orderright: '',
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
        },
        handleConfirm(e) {
            this.$emit('confirm');  // 传递确认事件
            this.orderok(this.orderCode);
        },
        orderok(orderCode){
            iorderOk(orderCode).then(res => {
                if(res && res.code == 200){
                    this.$emit('confirmReceipt');
                }
            })
        },
    }
}
</script>
<style scoped>
.projects{
    padding-bottom: 20px;
    color: #333;
}
.projects span::after{
    content: '、'
}
.projects span:last-child::after{
    content: ''
}
</style>
