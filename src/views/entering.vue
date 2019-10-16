<template>
  <div class="container">
    <div class="line"></div>
    <div class="content">
      <div class="bread">
        <span>当前位置：</span>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item href="">首页</a-breadcrumb-item>
          <a-breadcrumb-item href="">机构入驻</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="entering flexbox">
         <div class="review">
           <div class="title">企业审核</div>
           <a-divider dashed />
           <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
              <a-form-item v-bind="formItemLayout" label="类型：">
                <a-radio-group v-decorator="['type',{rules: [{required: true, message: '请选择类型' }],initialValue:authInfo.type }]">
                  <a-radio :value="0">
                    企业
                  </a-radio>
                  <a-radio :value="1">
                    事业单位
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="企业名称：">
                <a-input class="ant-col-8" maxlength="50" v-decorator="['name',{rules: [{required: true, message: '请填写企业名称' }],initialValue:authInfo.name }]"/>
                <div class="ant-col-6" style="width: 280px;margin-left: 18px;line-height: 20px;">需与当地政府颁发的商业许可证或企业证书上的名称完全<span class="red">一致</span>，信息审核成功后，<span class="red">名称不可修改</span></div>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="社会信息代码：">
                <a-input maxlength="18" v-decorator="['licenseCode',{rules: noTextByCode,initialValue:authInfo.licenseCode}]" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"/>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="营业执照"
              >
                <a-upload
                  name="licensePicFilePath"
                  listType="picture-card"
                  class="ant-col-4 avatar-uploader"
                  :action='GLOBAL.uploadUrl'
                  :data ="getAction"
                  :showUploadList="false"
                  :beforeUpload="GLOBAL.checkimg"
                  @change="handleChange"
                  v-decorator="['licensePicFilePath',{rules: [{required: true, message: '请上传营业执照' }],initialValue:authInfo.licensePicFilePath}]"
                >
                  <img v-if="licensePicFileUrl" :src="licensePicFileUrl" alt="营业执照"/>
                  <div v-else style="z-index: 999;">
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">上传图片</div>
                  </div>
                </a-upload>
                <div class="ant-col-5" style="width: 275px;line-height: 20px;margin-left: 10px;"><span class="red">注意：</span>请上传证件清晰彩色原件扫描件或数码照,在有效期内且年检章齐全(当年成立的 可无年检章),由中国大陆工商局或市场监督管理局颁发支持.jpg,.png,.bmp,.jpeg,.raw格式照片</div>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="注册电话：">
                <a-input v-decorator="['tel',{ rules: phoneRule,initialValue:authInfo.tel}]" />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="邮箱地址：">
                <a-input maxlength="254" v-decorator="['email',{rules: emailRule,initialValue:authInfo.email}]" />
              </a-form-item>
              <a-divider dashed />
              <a-form-item v-bind="formItemLayout" label="法人代表：">
                <a-input maxlength="50" v-decorator="['bossName',{rules: [{required: true, message: '请填写法人代表' }],initialValue:authInfo.bossName}]" />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="法人身份证/护照号：">
                <a-input maxlength="50" v-decorator="['bossIDCode',{rules: [{required: true, message: '请填写法人法人身份证/护照号' }],initialValue:authInfo.bossIDCode}]" />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="法人代表联系电话：">
                <a-input v-decorator="['bossTel',{rules: phoneRule,initialValue:authInfo.bossTel}]" />
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="签章图片"
              >
                <a-upload
                  name="signaturePicFilePath"
                  listType="picture-card"
                  class="ant-col-4 avatar-uploader"
                  :action="GLOBAL.uploadUrl"
                  :data ="getAction"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload"
                  @change="handleChangeBySign"
                  v-decorator="['signaturePicFilePath',{rules: [{required: true, message: '请上传签章图片' }],initialValue:authInfo.signaturePicFilePath}]"
                >
                  <img v-if="signaturePicFileUrl" :src="signaturePicFileUrl" alt="签章图片" />
                  <div v-else>
                      <a-icon :type="loadingBySign ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">上传图片</div>
                  </div>
                </a-upload>
                <ul class="ant-col-5 signature">
                  <li>请上传签章图片尺寸</li>
                  <li> · 格式 .png</li>
                  <li> · 尺寸 170*170像素</li>
                  <li> · 透明图片</li>
                  <li> · 图片上传后不可修改</li>
                </ul>
              </a-form-item>
              <!-- <a-form-item v-bind="tailFormItemLayout">
                <a-checkbox v-decorator="['agreement', {rules: [{ required: true, message: '请同意服务条款' }],initialValue:authInfo.agreement}]" @change="onChange">
                  同意<a href="javascript:;" @click="goNote()">《服务条款》</a>和<a href="javascript:;" @click="goNote()">《隐私权相关政策》</a>
                </a-checkbox>
                <div class="ant-form-explain red" v-if="checkAgreement == false">请同意服务条款</div>
              </a-form-item> -->
              <a-form-item v-bind="tailFormItemLayout">
                <a-button type="primary" html-type="submit" :loading="loadingBtn">
                  {{loadingBtnText}}
                </a-button>
              </a-form-item>
           </a-form>
         </div>
         <div class="process">
           <div class="process-title">
              机构入驻流程
           </div>
           <div class="process-box">
              企业认证后在后台填写资质认证
              <p>【商户入驻】-【商户后台】-【资质认证】</p>
           </div>
           <div class="process-title">
              入驻信息
           </div>
           <div class="process-box">
              <ul>
                <li>1.企业名称：营业执照证书上名称</li>
                <li>2.社会信息代码：营业执照上可查询，统一社会信用代码是一组长度为18位的用于法人和其他组织身份识别的代码</li>
                <li>3.注册电话：企业注册时用的电话</li>
                <li>4.邮箱地址：企业注册邮箱</li>
                <li>5.法人代表：填写法人代表姓名</li>
                <li>6.法人身份证\护照号：填写对应的身份 证信息或护照号信息</li>
                <li>7.法人代表电话：填写法人手机后</li>
                <li>8.签章照片：用户之后线上合同生成 企业公章图片(.png 格式:170*170PX，透明的)</li>
              </ul>
           </div>
           <div class="process-title">
              资质认证需求
           </div>
           <div class="process-box prove">
              <ul>
                <li>1.CNAS、CMA证明 <p>获得认证图片及期限</p></li>
                <li>2.设备证明、权威人员 <p>可检测项目、主要设备名称及照片、权威人员信息</p></li>
                <li>3.工商场地证明 <p>注册地址、场地详细地址、图片（场地、大门公司名）</p></li>
              </ul>
           </div>
           <div class="process-title">
              审核流程
           </div>
           <div class="process-box">
              <a-timeline>
                <a-timeline-item>企业认证</a-timeline-item>
                <a-timeline-item>资质审核</a-timeline-item>
                <a-timeline-item>现场考察</a-timeline-item>
                <a-timeline-item>提交保证金</a-timeline-item>
                <a-timeline-item>审核认证成功</a-timeline-item>
              </a-timeline>
           </div>
         </div>
      </div>
    </div>
     <sub-success-modal :width="282" :visible="isShowModal" message="提交成功，等待申请通过" :messageByEnter="true"></sub-success-modal>
     <openNoteModal :visible.sync="openNoteVisible"></openNoteModal>
  </div>
</template>
<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
import subSuccessModal from '../components/subSuccessModal'
import openNoteModal from '../components/openNoteModal'
import {addAuth,updateAuth,getAuth} from '@/service/getData'
import {validatePhone} from '../api/validateForm.js'

export default {
  components: {
     subSuccessModal,openNoteModal
  },
  data () {
    return {
      orgId: this.$store.getters.getOrgId,                 //机构ID
      storeId: this.$store.getters.getStoreId,               //店铺ID
      loading: false,            //营业执照
      loadingBySign: false,      //签章图片
      licensePicFileUrl: '',     //长地址用于显示
      signaturePicFileUrl: '',   //长地址用于显示
      isShowModal: false,
      loadingBtn: false,         //按钮显示样式
      loadingBtnText: '提交',        //提交
      openNoteVisible: false,      //协议
      checkAgreement: true,
      authInfo:{
        type: '',                  //类型
        name: '',                  //企业名称
        licenseCode: '',           //社会信息码
        tel: '',                   //注册电话
        email: '',                 //注册邮箱
        bossName: '',              //法人代表
        bossIDCode: '',            //法人身份证
        bossTel: '',               //法人电话
        licensePicFilePath: '',    //营业执照
        signaturePicFilePath: '',  //签章图片
      },
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 4,
          },
        },
      },
      phoneRule : [
          { required: true, message: '请填写电话' },
          { pattern : /^\d{3}-?\d{8}$|^1[3456789][0-9]{9}$/, message: '请填写正确电话号码' }
      ],
      emailRule : [
          { required: true, message: '请填写邮箱地址' },
          { pattern : /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/, message: '请填写正确邮箱地址' }
      ],
      noTextByID : [
          { required: true, message: '请填写法人身份证/护照号' },
          { pattern : /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/, message: '请填写正确身份证/护照号' }
      ],
      noTextByCode : [
          { required: true, message: '请填写社会信息码' },
          { pattern : /[^\a-\z\A-\Z]/g, message: '请填写正确身份证/护照号' }
      ],
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if(this.checkAgreement){
            this.$set( values, 'licensePicFilePath', this.authInfo.licensePicFilePath);
            this.$set( values, 'signaturePicFilePath', this.authInfo.signaturePicFilePath);
            this.$delete( values, 'agreement');
            if(this.orgId){
              this.$set( values, 'orgId', this.orgId);
              this.$set( values, 'storeId', this.storeId);
              updateAuth(values).then(res => {
                if(res && res.code == 200){
                  this.isShowModal = true;
                }
              })
            }else{
              this.loadingBtn = true;
              this.loadingBtnText = '提交中';
              addAuth(values).then(res => {
                if(res && res.code == 200){
                  this.isShowModal = true;
                  this.loadingBtn = false;
                  this.loadingBtnText = '提交';
                  this.$store.dispatch('saveOrgId',res.data.orgId);
                  this.$store.dispatch('saveStoreId',res.data.storeId);
                }else{
                  this.loadingBtn = false;
                  this.loadingBtnText = '提交';
                }
              })
            }
          }
        }
      });
    },
    onChange(e){
      this.checkAgreement = e.target.checked;
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.licensePicFileUrl = imageUrl
          this.loading = false
        })
        if(info.file.response.code == 200){
            this.authInfo.licensePicFilePath = info.file.response.data[0].path;  //图片上传成功后，后台返回路径
        }
      }
    },
    handleChangeBySign(info){
      if (info.file.status === 'uploading') {
        this.loadingBySign = true
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrlBySign) => {
          this.signaturePicFileUrl = imageUrlBySign
          this.loadingBySign = false
        })
        if(info.file.response.code == 200){
            this.authInfo.signaturePicFilePath = info.file.response.data[0].path;  //图片上传成功后，后台返回路径
        }
      }
    },
    beforeUpload(file){
        return new Promise((resolve, reject) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                Vue.prototype.$message.error('支持图片格式.png');
                return reject(false)
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                Vue.prototype.$message.error('图片大小必须小于2MB!');
                return reject(false)
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                //加载图片获取图片真实宽度和高度
                var image = new Image();
                image.onload=function(){
                    var width = image.width;
                    var height = image.height;
                    if (width != 170 || height != 170){
                        Vue.prototype.$message.error('图片尺寸必须是170x170像素');
                        return reject(false)
                    }else{
                        return resolve(true);
                    }
                };
                image.src= data;
            };
            reader.readAsDataURL(file);
        });
    },
    getAction(){
      return{
        functionCode: 1,   //	机能Code 0-测试 1-企业认证 2-资质审核 3-店铺授权 4-订单检测报告
        id: ''             //关联ID 根据机能Code传相应ID 0-空白 1-空白 2-机构组织ID 3-店铺ID 4-订单ID
      }
    },
    getAuthInfo(){
      getAuth(this.orgId).then(res => {
        if(res.code == 200){
           this.authInfo = res.data;
           this.licensePicFileUrl = this.authInfo.licensePicFileUrl;
           this.signaturePicFileUrl = this.authInfo.signaturePicFileUrl;
        }
      })
    },
    goNote(){
      this.openNoteVisible = true;
    }
  },
  mounted(){
    if(this.orgId){
      this.getAuthInfo();
    }
  }
};
</script>
<style scoped>
.bread >>>.ant-breadcrumb-separator {
  margin: 0 2px;
  color: rgba(0, 0, 0, 0.45);
}
.bread >>>.ant-breadcrumb a {
  color:rgba(51,51,51,1);
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
}
.review >>> .ant-divider-horizontal{
  margin: 20px 0;
}
.review form >>> .ant-divider-horizontal{
  margin: 40px 0;
}
.review .ant-form .ant-form-item >>> .ant-input{
  width: 224px;
  border-radius: 4px;
}
.review .ant-form .ant-form-item >>>.ant-form-extra span{
  color: #D0021B;
}
.review .ant-form .ant-form-item >>> button{
  height:40px;
  border-radius:4px;
}
.flexbox{
  display: flex;
  justify-content: space-between;
}
ul{
  padding: 0;
  margin: 0;
}
ul li{
  list-style: none;
}
.container{
  width: 100% !important;
}
.line{
  width: 100%;
  height: 1px;
  background:rgba(217,217,217,1);
  position: relative;
}
.content{
  position: relative;
  width: 1200px;
  margin: 0 auto;
}
.content .bread{
  margin-top: 20px;
  display: flex;
}
.content .entering{
  margin-top: 64px;
}
.entering .enter-line{
  width:839px;
  height:1px;
  border:1px dashed rgba(217,217,217,1);
}
.entering .review{
  width: 840px;
}
.entering .review .title{
  width: 79px;
  height: 16px;
  border-left: 2px solid rgba(35,0,168,1);
  padding-left: 7px;
  font-size:16px;
  font-weight:bold;
  line-height: 16px;
}
.entering .process{
  width:320px;
  height:1016px;
  font-size:16px;
  font-weight:bold;
  color:rgba(51,51,51,1);
  line-height:16px;
  border:1px solid rgba(217,217,217,1);
}
.entering .process .process-title{
  width:320px;
  height:40px;
  padding-left: 20px;
  background:rgba(217,217,217,1);
  font-size:16px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:40px;
}
.entering .process .process-box{
  width: 320px;
  padding: 20px 10px 20px 20px;
  font-size:16px;
  font-weight:400;
  color:rgba(0,0,0,0.65);
}
.entering .process .process-box p{
  margin-top: 5px;
  margin-bottom: 0;
  font-size:14px;
}
.entering .process .process-box ul li{
  margin-bottom: 15px;
  font-size:14px;
  line-height: 20px;
}
.entering .process .process-box ul li:last-child{
  margin-bottom: 0;
}
.entering .process .prove ul li p{
  font-size:12px;
  color: #D0021B;
}
.entering .process .process-box >>> .ant-timeline-item{
  padding: 0;
}
.entering .process .process-box >>> .ant-timeline-item-head-blue {
  border-color: #979797;
  color: #979797;
}
.entering .process .process-box >>> .ant-timeline-item-head{
  background-color: #979797;
}
.signature{
  line-height: 20px;
  color: #D0021B;
  margin-left: 10px;
  width: 140px;
}
</style>
