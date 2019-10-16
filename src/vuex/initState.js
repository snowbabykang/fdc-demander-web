// 应用初始状态
export const state = {
  showBtn : true,    //示例
  token : '',        //登录获取的token，每个请求都要带
  orgId : '',        //登录存储机构id
  storeId : '',      //登录存储店铺ID
  loginPhone: '',    //登录用户
  updatePsdinfo : {},   //修改密码第一步记录手机号与code
  orderInfo: {},        //生成订单信息
  paymentType: '',      //支付类型
  name: '',             //根据服务名称搜索展示店铺列表
};
