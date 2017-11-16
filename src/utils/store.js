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
    get debug() { return currentState.debug; },
    set token(token) {
      if (!token) {
        throw new Error('Token is required');
      }
      currentState.token = token;
    },
    get token() { return currentState.token; },
    set publicKey(publicKey) {
      if (!publicKey) {
        throw new Error('Public key is required');
      }
      currentState.publicKey = publicKey;
    },
    get publicKey() { return currentState.publicKey; },
  };
}

const store = createStore();
export default store;
