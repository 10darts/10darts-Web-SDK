function createStore() {
  let currentState = {
    publicKey: null,
    token: null,
    device: null,
    autosubscribe: false,
    debug: false,
  };
  function setState(state) {
    currentState = { ...currentState, ...state };
  }
  function getState() {
    return currentState;
  }
  return {
    setState,
    getState,
  };
}

const store = createStore();
export default store;
