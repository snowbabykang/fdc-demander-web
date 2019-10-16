<!-- 查看委托单modal -->
<template>
    <section>
        <a-modal
            class="entrustModal"
            centered
            :closable = "false"
            :footer="null"
            v-model="isvisible"
            :width="780"
            @cancel = "handleCancel()"
        >
            <div class="entrustBox">
            <div class="closebox" @click = "handleCancel()">
                <span class="closeicon"><a-icon type="close-circle" theme="filled" /></span>
            </div>

            <img :src="imgSrc">

            <!-- <table border="1" cellspacing="" cellpadding="" width="100%" class="entrustTb">
                <tr>
                    <td colspan="8">
                        <div class="title"><b>北京市毛麻丝织品质量监督检验站</b></div>
                        <div class="bigtitle"><b>委托检验协议书</b></div>
                        <div class="imgbox"><img src="1.jpeg" alt="" /></div>
                        <div style="clear: both;"></div>
                        <div class="ordernum">订单号：15461456411461542</div>
                    </td>
                </tr>
                <tr>
                    <td rowspan="8"><div class="width-one">委托书填写</div></td>
                    <td colspan="2">委托方（全称）</td>
                    <td colspan="2" class="graybg text-left">1212</td>
                    <td>委托日期</td>
                    <td colspan="2" class="graybg text-left">1212</td>
                </tr>
                <tr>
                    <td colspan="2">付款单位</td>
                    <td colspan="2" class="graybg text-left">1212</td>
                    <td>联系电话</td>
                    <td colspan="2" class="graybg text-left">1212</td>
                </tr>
                <tr>
                    <td style="width: 3em"><div style="width: 2em;margin: 0 auto;">样品编号</div></td>
                    <td width="100">样品名称</td>
                    <td width="120">货、款号/色号</td>
                    <td width="120">原料成分</td>
                    <td width="100">类别/等级</td>
                    <td width="120">商标</td>
                    <td width="120">样品粘贴处</td>
                </tr>
                <tr v-for="item in 4" :key="item">
                    <td>{{item}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><div class="width-one">承检项目</div></td>
                    <td colspan="6" class="projectlist text-left graybg">
                        <span v-for="item in 20" :key="item">针织面料</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="6"><div class="width-one">检验方填写</div></td>
                    <td colspan="2">检验类型</td>
                    <td colspan="2" class="text-left"> <a-radio-group :options="typeOptions" disabled :value="1"/> </td>
                    <td>检验依据</td>
                    <td colspan="2" class="text-left"><a-radio-group :options="accordOptions" disabled :value="1"/></td>
                </tr>
                <tr>
                    <td colspan="2">检验结果评定</td>
                    <td colspan="2" class="text-left"><a-radio-group :options="resultOptions" disabled :value="1"/></td>
                    <td>退还样品</td>
                    <td colspan="2" class="text-left"><a-radio-group :options="resultOptions" disabled :value="2"/></td>
                </tr>
                <tr>
                    <td colspan="2">领取报告方式</td>
                    <td colspan="2" class="text-left"><a-radio-group :options="getOptions" disabled :value="2"/>
                    </td>
                    <td>交期选择</td>
                    <td colspan="2" class="text-left"><a-radio-group :options="deliveryOptions" disabled :value="2"/>
                        <div style="color: rgba(0, 0, 0, 0.25)">(另外收取检测费的50%作为加急费)</div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">样品状态</td>
                    <td colspan="5" class="text-left"><a-radio-group :options="sampleStatusOptions" disabled :value="2"/></td>
                </tr>
                <tr>
                    <td colspan="2">测试服务费</td>
                    <td colspan="5" class="text-left"><a-radio-group :options="serviceOptions" disabled :value="2"/></td>
                </tr>
                <tr>
                    <td><div class="width-one">协议说明</div></td>
                    <td colspan="6" class="description text-left">
                        <div>1、委托方保证提供资料和实物真实可靠。未经委托方允许，检验方不得将委托相关信息泄露给第三方。</div>
                        <div>2、因委托方原因致使检验暂停，则完成日期顺延；委托方要求中断检验时，费用按实际完成的项目结算。</div>
                        <div>3、凭此委托书领取检验报告。费用未付清者，本站有权拒发检验报告。</div>
                        <div>4、检验报告及委托书要求退样的样品请及时领取，在报告签发之日起三个月后仍不领取者视同放弃，本站不负责保管责任。</div>
                    </td>
                </tr>
                <tr>
                    <td><div class="width-one">备注</div></td>
                    <td colspan="5"></td>
                    <td>加印报告</td>
                    <td class="graybg">4</td>
                </tr>
                <tr>
                    <td colspan="8" class="text-left">
                        <div class="signbox">委托方（送样人）签字：</div>
                        <div class="signbox">检验方（经办人）签字：</div>
                    </td>
                </tr>
                <tr>
                    <td colspan="8" class="footer text-left">
                        <div><span>清河部总部地址：海淀区清河小营路XXXXXXX</span><span>电话：XXXXXXX</span><span>传真：XXXXXX</span></div>
                        <div><span>第一分部地址：海淀区清河小营路XXXXXXX</span><span>电话：XXXXXXX</span></div>
                        <div><span>第二分部地址：海淀区清河小营路XXXXXXX</span><span>电话：XXXXXXX</span><span>户名：XXXXXXX</span></div>
                        <div><span>账号：XXXXXXX</span><span>开户行：XXXXXXXXXX</span></div>
                    </td>
                </tr>
            </table> -->
            <div class="text-center submitbtn"><a-button type="primary" @click="handleDownload">下载委托书</a-button></div>
            </div>
        </a-modal>
    </section>
</template>

<script>
export default {
    name: 'entrustModal',
    props: {
        visible: { type: Boolean, default: false },
        imgSrc: '',
    },
    data() {
        return {
            typeOptions : [{ label: '委托', value: 1 }, { label: '仲裁', value: 2 }],
            accordOptions : [{ label: '国际', value: 1 }, { label: '其他', value: 2 }],
            resultOptions : [{ label: '是', value: 1 }, { label: '否', value: 2 }],
            getOptions : [{ label: '自取', value: 1 }, { label: '邮寄', value: 2 }],
            deliveryOptions : [{ label: '常规', value: 1 }, { label: '加急', value: 2 }],
            sampleStatusOptions : [{ label: '符合规定要求', value: 1 }, { label: '偏离或异常', value: 2 }],
            serviceOptions : [{ label: '押金', value: 1 }, { label: '已付清', value: 2 }, { label: '记账', value: 3 }],
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
        handleDownload(e) {
            this.$emit('update:visible', false);    // 更新visible的值
            this.$emit('confirm');  // 传递确认事件
        },
    },
}
</script>
<style type="text/css">
.entrustModal .ant-modal-content{
    background: transparent;
    box-shadow: none;
}
</style>
<style scoped>
.entrustBox{
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
.width-one{
    width: 1em;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: content-box;
}
.graybg{
    background: #F2F2F2;
}
.projectlist{

}
.projectlist span{
    padding: 4px 15px 4px 0;
    display: inline-block;
}
table.entrustTb{
    border-spacing: 0;
}
table tr td{
    text-align: center;
    padding: 12px 0;
    font-size: 12px;
}
table tr td >>> .ant-radio-group{
    display: flex;
}
table tr td >>> .ant-radio-wrapper{
    font-size: 12px;
    flex: 1;
}
.description{
    padding-left: 10px;
    line-height: 1.8;
}
.signbox{
    display: inline-block;
    width: 48%;
}
.text-left{
    text-align: left;
    padding-left: 10px;
}
.footer span{
    line-height: 1.8;
    padding-right: 30px;
}
.title{
    font-size: 18px;
    letter-spacing: 10px;
}
.bigtitle{
    font-size: 30px;
    padding-top: 15px;
    letter-spacing: 5px;
}
.ordernum{
    padding-left: 3em;
    text-align: left;
    margin-top: -2em;
}
.imgbox{
    display: inline-block;
    float: right;
    margin-top: -50px;
    padding-right: 10px;
    width: 25%;
    min-height: 80px;
}
.imgbox img{
    max-width: 100%;
}
.submitbtn{
    margin-top: 42px;
}
</style>
