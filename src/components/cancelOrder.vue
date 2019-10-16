<!-- 取消订单操作 -->
<template>
    <section>
        <a-modal
            centered
            :footer="null"
            v-model="isvisible"
            :width="422"
            @cancel = "handleCancel()"
            :orderCode="orderCode"
        >
            <div style="padding: 56px 0 80px;">
                请选择取消订单的理由：
                <a-select style="width: 200px" @change="handleChange" v-model="cancelReason" placeholder="请选择">
                    <a-select-option v-for="(item,index) in 6" :key="index" :value="index+1">{{cancelReasonText[index+1]}}</a-select-option>
                </a-select>
            </div>
            <div class="text-center submitbtn">
                <a-button type="primary" @click="handleConfirm" :disabled="!cancelReason">确认</a-button>
                <a-button @click="handleCancel">取消</a-button>
            </div>
        </a-modal>
    </section>
</template>

<script>
import {cancelReasonText} from '../api/dictionary'
import {deleteIorder} from '@/service/getData'
export default {
    name: 'cancelOrder',
    props: {
        visible: { type: Boolean, default: false },
        orderCode:{ type: String, default: ''  },
    },
    data() {
        return {
            cancelReason : undefined,
            cancelReasonText: cancelReasonText
        };
    },
    computed : {         //点击背景阴影隐藏model
        isvisible : {
            get: function () {
                this.cancelReason = undefined;
                return this.visible;
            },
            set: function () {

            }
        }
    },
    methods: {
        handleChange(){

        },
        handleCancel(){
            this.$emit('update:visible', false);    // 更新visible的值
            this.$emit('cancel');   // 传递取消事件
        },
        handleConfirm(e) {
            let cancelReason = this.cancelReason;
            this.$emit('update:visible', false);    // 更新visible的值
            this.$emit('confirm',cancelReason);  // 传递确认事件
            this.delateOrder(this.orderCode,this.cancelReason);
        },
        delateOrder(orderCode,cancelReason){
            deleteIorder(orderCode,cancelReason).then(res => {
                if(res && res.code == 200){
                    this.$emit('delateOrder');
                }
            })
        }
    },
}
</script>
<style scoped>
.submitbtn .ant-btn{
    margin: 0 15px;
}
</style>
