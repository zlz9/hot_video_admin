import handlerUser from "./index";

let reducer = (state = { ...handlerUser.state }, action: { type: string }) => {
  let newState = JSON.parse(JSON.stringify(state));

  for (let key in handlerUser.actionNames) {
    if (action.type === handlerUser.actionNames[key]) {
      handlerUser.actions[handlerUser.actionNames[key]](newState, action);
      break;
    }
  }

  return newState;
};
export default reducer;
