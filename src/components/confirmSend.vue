<!-- 亲自送样提示 -->
<template>
    <section>
        <a-modal
            centered
            :footer="null"
            v-model="isvisible"
            :orderCode="orderCode"
            :width="422"
            @cancel = "handleCancel()"
        >
            <div style="padding: 48px 0 40px;">
                <div class="projects">请确定样布尺寸并与委托方一起送到指定实验室</div>
            </div>
            <div class="text-center submitbtn">
                <a-button type="primary" @click="handleConfirm">确认</a-button>
            </div>
        </a-modal>
    </section>
</template>

<script>
import {sendSimpleInPerson} from '@/service/getData'
export default {
    name: 'confirmSend',
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
            this.$emit('update:visible', false);    // 更新visible的值
        },
        handleConfirm(e) {
            this.$emit('update:visible', false);    // 更新visible的值
            this.orderok();
        },
        orderok(){
            let send = {orderCode: this.orderCode};
            sendSimpleInPerson(send).then((res) =>{
              if(res && res.code == 200){
                if(res.data.code == 200){
                  this.$emit('confirmSendOk');
                }
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
    text-align: center;
}
</style>
