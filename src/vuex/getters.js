export const isShow = (state) => {
  	return state.showBtn
};

//获取token值
export const getToken = (state) => {
  return state.token;
};

// 获取机构ID
export const getOrgId = (state) => {
    return state.orgId;
};

export const getStoreId = (state) => {
    return state.storeId;
};

//获取登录用户手机号
export const getLoginPhone = (state) =>{
  return state.loginPhone;
}

//获取修改密码第一步记录的手机号与code
export const getPsdInfo = (state) => {
    return state.updatePsdinfo;
};

//获取生成订单信息
export const getOrderInfo = (state) => {
    return state.orderInfo;
}

//获取支付类型
export const getPaymentType = (state) => {
  return state.paymentType;
}

//获取header搜索框服务名称
export const getName = (state) => {
  return state.name;
}
