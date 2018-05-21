import { DEVICE, PERSONA, LAST_ACCESS } from '../configuration';

function createStore() {
  let currentState = {
    device: typeof localStorage !== 'undefined' ? localStorage.getItem(DEVICE) : null,
    lastAccess: typeof localStorage !== 'undefined' ? localStorage.getItem(LAST_ACCESS) : null,
    token: null,
    publicKey: null,
    autosubscribe: false,
    geolocation: false,
    debug: false,
    scope: '/',
    serviceWorkerPath: '/',
    key: null,
    cache: true,
  };

  return {
    setState(state) {
      currentState = { ...currentState, ...state };
    },
    getState() {
      return currentState;
    },
    get geolocation() {
      return currentState.geolocation;
    },
    get debug() {
      return currentState.debug;
    },
    get cache() {
      return currentState.cache;
    },
    get scope() {
      return currentState.scope;
    },
    get serviceWorkerPath() {
      return currentState.serviceWorkerPath;
    },
    set token(token) {
      if (!token) {
        throw new Error('Token is required');
      }
      currentState.token = token;
    },
    get token() {
      return currentState.token;
    },
    set publicKey(publicKey) {
      if (!publicKey) {
        throw new Error('Public key is required');
      }
      currentState.publicKey = publicKey;
    },
    get publicKey() {
      return currentState.publicKey;
    },
    set device(device) {
      currentState.device = device;
      if (currentState.cache) {
        if (device === null || device === undefined) {
          localStorage.removeItem(DEVICE);
        } else {
          localStorage.setItem(DEVICE, device);
        }
      }
    },
    get device() {
      return currentState.device;
    },
    set persona(persona) {
      currentState.persona = persona;
      if (currentState.cache) {
        if (persona === null || persona === undefined) {
          localStorage.removeItem(PERSONA);
        } else {
          localStorage.setItem(PERSONA, persona);
        }
      }
    },
    get persona() {
      return currentState.persona;
    },
    set lastAccess(lastAccess) {
      currentState.lastAccess = lastAccess;
      if (currentState.cache) {
        if (lastAccess === null || lastAccess === undefined) {
          localStorage.removeItem(LAST_ACCESS);
        } else {
          localStorage.setItem(LAST_ACCESS, lastAccess);
        }
      }
    },
    get lastAccess() {
      return currentState.lastAccess;
    },
    get key() {
      return currentState.key;
    },
    set key(key) {
      if (typeof key === 'string') {
        currentState.key = { label: key };
      } else {
        if (!key.label || !key.value) {
          throw new Error('key value need a label and value');
        }
        currentState.key = key;
      }
    },
  };
}

const store = createStore();
export default store;
