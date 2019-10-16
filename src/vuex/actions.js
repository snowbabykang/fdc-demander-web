export const showBtn = (context) => {
	context.commit('show');
};
export const hideBtn = (context) => {
	context.commit('hide');
};
export const saveToken = (context,val) => {
  context.commit('saveToken',val);
};
export const removeToken = (context) =>{
  context.commit('removeToken')
}
export const saveOrgId = (context,val) => {
    context.commit('saveOrgId',val);
};
export const saveStoreId = (context,val) => {
    context.commit('saveStoreId',val);
};

export const saveLoginPhone = (context,val) =>{
  context.commit('saveLoginPhone',val)
};
export const savePsdInfo = (context,val) => {
    context.commit('savePsdInfo',val);
};

export const removePsdInfo = (context) => {
    context.commit('removePsdInfo');
};

export const saveOrderInfo = (context,val) => {
  context.commit('saveOrderInfo',val);
};

export const savePaymentType = (context,val) => {
  context.commit('savePaymentType',val);
};

export const saveName = (context,val) => {
  context.commit('saveName',val);
};
