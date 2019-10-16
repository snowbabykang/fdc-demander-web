import { state } from "./initState"
var copyState = deepClone(state) // 拷贝state对象
function deepClone (obj) {
  var newObj = obj instanceof Array ? [] : {}
  for (var i in obj) {
    newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
  }
  return newObj
}
export default {
    // 退出登录初始化
    resetState (state) {
      for (var i in copyState) {
        state[i] = copyState[i] // 递归赋值
      }
    },
    show (state) {
      state.showBtn = true;
    },
    hide (state) {
      state.showBtn = false;
    },
    saveToken(state,val){
      state.token = val;
    },
    removeToken(state){
      state.token = '';
    },
    saveOrgId (state,val) {
        state.orgId = val;
    },
    saveStoreId (state,val) {
        state.storeId = val;
    },

    saveLoginPhone(state,val){
      state.loginPhone = val;
    },
    savePsdInfo(state,val){
        state.updatePsdinfo = val;
    },
    removePsdInfo(state){
        state.updatePsdinfo = "";
    },

    saveOrderInfo(state,val){
      state.orderInfo = val;
    },
    savePaymentType(state,val){
      state.paymentType = val;
    },
    saveName(state,val){
      state.name = val;
    }
}
