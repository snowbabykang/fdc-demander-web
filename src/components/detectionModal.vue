<!--下载报告单modal -->
<template>
    <section>
        <a-modal
            class="detectionModal"
            centered
            :closable = "false"
            :footer="null"
            v-model="isvisible"
            :width="700"
            @cancel = "handleCancel()"
        >
            <div class="detectionBox">
                <div class="closebox" @click = "handleCancel()">
                    <span class="closeicon"><a-icon type="close-circle" theme="filled" /></span>
                </div>
                <div class="detectionImg"><img :src="'../../static/common-img/loginbg.png'" alt=""></div>
                <div class="text-center submitbtn"><a-button type="primary" @click="handleDownload">下载报告单</a-button></div>
            </div>
        </a-modal>
    </section>
</template>

<script>
export default {
    name: 'detectionModal',
    props: {
        visible: { type: Boolean, default: false },   
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
        handleDownload(e) {
            this.$emit('update:visible', false);    // 更新visible的值
            // this.$emit('confirm');  // 传递确认事件
        },
    },
}
</script>
<style type="text/css">
.detectionModal .ant-modal-content{
    background: transparent;
    box-shadow: none;
}
</style>
<style scoped>
.detectionBox{
    background: #fff;
    padding: 20px;
    position: relative;
    margin-top: 40px;
}
.closebox{
    position: absolute;
    top: -52px;
    right: 0;
    color: #000;
    cursor: pointer;
}
.closebox .closeicon{
    font-size: 26px;
}
.closebox .closeicon:after{
    content : "";
    border-right: 2px solid #000;
    position: absolute;
    top: 26px;
    right: 12px;
    height: 26px;
}
.submitbtn{
    margin-top: 42px;
}
</style>
