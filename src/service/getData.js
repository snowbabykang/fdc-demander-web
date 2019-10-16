import fetch from '../api/fetch'

/**
 * fetch参数说明，可查看fetch.js
 * 方法名 = （参数） =>  fetch(请求链接，请求参数，请求类型，请求域名的名（默认api就是后端接口的域名）)
 */

//注册
export const registered = (active,password,phone) =>fetch('/user/register',{
  active: active,
  password: password,
  phone: phone
},'POST');

export const sendNoted = (phone) =>fetch('/user/sendNote',{
  phone: phone
},'POST');


// 校验图片验证码
export const verifyImgCode = (code) => fetch('/user/verifyCode', {tryCode : code}, 'GET','api');

//登录
export const login = (phone,password) => fetch('/user/login', {
    phone : phone,
    password : password,
}, 'POST','api');

// 注销 退出登录
export const logout = () => fetch('/user/exit', {}, 'POST','api');

//修改密码获取短信验证码
export const getMsgCode = (phone) => fetch('/user/sendFindPasswordNote', {phone : phone}, 'POST','api');

// 验证短信验证码
export const verifyMsgCode = (phone,code) => fetch('/user/checkActive', {
    phone : phone ,
    active : code
}, 'POST','api');

// 修改密码
export const changePsd = (phone,password,active) => fetch('/user/setNewPassword', {
    phone : phone,
    password : password,
    active : active
}, 'POST','api');






// export const iorderOk = (typeId,orderCode) => fetch('/iorder/iorderOk', {
// 	typeId:typeId,
// 	orderCode:orderCode,

// }, 'POST','api');

// export const deleteIorder = (typeId,orderCode) => fetch('/iorder/deleteIorder', {
// 	typeId:typeId,
// 	orderCode:orderCode,

// }, 'POST','api');

// 获取省市区地址
export const getProvince = () => fetch('/address/type/province', {}, 'GET','api');
export const getCity = (id) => fetch('/address/type/city', {provinceId : id}, 'GET','api');
export const getArea = (id) => fetch('/address/type/area', {cityId : id}, 'GET','api');

// 获取用户地址列表
export const getAddresslist = () => fetch('/user/address/list', {}, 'GET','api');

// 查询用户地址
export const getAddressinfo = (id) => fetch('/user/address/one', {id : id}, 'GET','api');

// 新建（post） 编辑（put）用户地址
export const editAddressinfo = (value,type) => fetch('/user/address/one', value, type,'api');

// 删除用户地址
export const delAddressinfo = (id) => fetch('/user/address/one', {id : id}, 'DELETE','api');

// 设置用户默认地址
export const setAddrDefault = (id) => fetch('/user/address/default', {id : id}, 'PUT','api');





//根据服务关键字展示店铺
export const showStore = (typeId,commodityName,pageNum,pageSize) =>fetch('/store/info/commodityName',{
  typeId: typeId,
  commodityName: commodityName,
  pageNum: pageNum,
  pageSize: pageSize
},'GET','api');

//店铺详情
export const getStoreDetail = (storeId) =>fetch('/store/info/storeId',{
  storeId: storeId,
},'GET','api');

//店铺详情 主要设备接口
export const getEquipment = (orgId) =>fetch('/store/info/showEquipment',{
  orgId: orgId,
},'GET','api');

//店铺详情 专家介绍接口
export const getProfessor = (orgId) =>fetch('/store/info/showProfessor',{
  orgId: orgId,
},'GET','api');

//服务（商品详情）
export const getCommodity = (id) =>fetch('/commodity/info/one',{
  id: id,
},'GET','api');

//机构入驻
export const addAuth = (authentication) =>fetch('/org/auth/one',authentication,'POST','api');

//机构入驻信息更新
export const updateAuth = (authentication) =>fetch('/org/auth/one',authentication,'PUT','api');

//机构入驻信息取得
export const getAuth = (orgId) =>fetch('/org/auth/one',{
  orgId: orgId
},'GET','api');

//订单列表 订单状态 1待付款 2已付款 3已寄样 4已收样 5检测中 6检测完成 7已发单 8已完成 9已取消
export const getiorderList = (typeId,pageNum,pageSize) =>fetch('/iorder/iorderList',{
  typeId: typeId,
  pageNum: pageNum,
  pageSize:pageSize
},'GET','api');

//删除订单
export const deleteOrder = (list) =>fetch('/iorder/deleteOrder',{
  list:list
},'POST','api');

//物流提交
export const saveExpress = (orderCode,expressNumber,expressCompany) =>fetch('/express/saveExpress',{
  orderCode:orderCode,
	expressNumber:expressNumber,
	expressCompany:expressCompany,
},'POST','api');

//物流修改
export const updateExpress = (orderCode,expressNumber,expressCompany,id) =>fetch('/express/updateExpress',{
	orderCode:orderCode,
	expressNumber:expressNumber,
	expressCompany:expressCompany,
	id:id,
},'POST','api');
//取消订单
export const deleteIorder = (orderCode,cancelReason) =>fetch('/iorder/deleteIorder',{
  orderCode:orderCode,
  cancelReason:cancelReason,
},'POST','api');
//订单详情
export const iorderParticulars = (orderCode) =>fetch('/iorder/iorderParticulars',{
  orderCode:orderCode,
},'GET','api');
//确认收货

export const iorderOk = (orderCode) =>fetch('/iorder/iorderOk',{
  orderCode:orderCode,
},'POST','api');



//个人认证新建
export const attestationNo = (bankAcount,identityCode,name,reservedPhone) =>fetch('/user/attestation/one',{
  bankAcount: bankAcount,
  flag: 0,
  identityCode:identityCode,
  name:name,
  reservedPhone:reservedPhone
},'POST','api');

//个人认证查询
export const attestationYes = () =>fetch('/user/attestation/one',{
},'GET','api');

//生成订单
export const createIOrder = (info) =>fetch('/iorder/createIorder',info,'POST','api');

//订单详情
export const getOrderDetail = (orderCode) =>fetch('/iorder/iorderParticulars',{
  orderCode: orderCode
},'GET','api');

//查看委托书
export const selectEntrust = (orderCode) =>fetch('/store/entrust/selectEntrust',{
  orderCode: orderCode
},'GET','api');

//委托书保存
export const saveEntrust = (saveEntrustFormBean) =>fetch('/store/entrust/saveEntrust',saveEntrustFormBean,'POST','api');

//支付宝支付
export const payByAlipay = (paymentFormBean) =>fetch('/payment/payment/zfb',paymentFormBean,'POST','api');

//微信支付
export const payByWeChat = (paymentFormBean) =>fetch('/payment/payment/weixin',paymentFormBean,'POST','api');

//银联支付
export const payByUnionPay = (paymentFormBean) =>fetch('/payment/payment/union', paymentFormBean , 'POST','api');

//查询订单是否支付成功
export const whetherPaySuccess = (orderCode,paymentType) =>fetch('/payment/zfb/tradeQuery',{
  orderCode: orderCode,
  paymentType: paymentType
},'GET','api');

//委托书预览
export const showEntrust = (orderCode) => {  return process.env.API_HOST+'/store/entrust/showEntrust?orderCode='+orderCode};

//委托书下载
export const downEntrust = (orderCode) => {  return process.env.API_HOST+'/store/entrust/downEntrust?orderCode='+orderCode};

//查询服务商品类目列表
export const getCommodityList = (pid) =>fetch('/commodity/type/list',{
  pid: pid
},'GET','api');

//亲自送样
export const sendSimpleInPerson = (sendSimpleFormBean) =>fetch('/iorder/sendSimple',sendSimpleFormBean,'POST','api');

//下载报告单
export const downLoadReport = (iorderId,token) => {  return process.env.API_HOST+'/store/entrust/downLoadReport?iOrderId='+iorderId+'&token='+token};

//查询存在【资质认证成功】的【组织机构】的省的地址资源列表
export const getOrgExistAddress = () =>fetch('/address/type/orgexistprovince',{},'GET','api');
