const store = {
  state: {
    // 放数据
    userInfo: {} as Author,
    token: "",
  },
  actions: {
    // 放同步方法
    setToken(
      newState: { token: string },
      action: { type: string; val: string }
    ) {
      newState.token = action.val;
    },
    clearInfo(
      newState: { token: string; userInfo: any },
      action: { type: string; val: any }
    ) {
      newState.token = "";
      newState.userInfo = null;
    },
  },
  asyncActions: {
    // 放异步方法
  },
  actionNames: {},
};
let actionNames = {};
for (let key in store.actions) {
  actionNames[key] = key;
}
store.actionNames = actionNames;

export default store;
