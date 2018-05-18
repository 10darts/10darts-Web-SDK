import store from './store';

const initialState = {
  publicKey: null,
  key: null,
  token: null,
  device: null,
  autosubscribe: false,
  geolocation: false,
  debug: false,
  lastAccess: null,
  scope: '/',
  serviceWorkerPath: '/',
};

describe('Store', () => {
  afterEach(() => {
    store.setState(initialState);
  });
  test('initial state state', () => {
    const state = store.getState();
    const expectedState = initialState;
    expect(state).toEqual(expectedState);
  });

  test('set state', () => {
    const token = 'xxxxxxx';
    store.setState({ token });
    const expectedState = {
      ...initialState,
      token,
    };
    const state = store.getState();
    expect(state).toEqual(expectedState);
  });
  test('set token', () => {
    expect(() => {
      store.token = null;
    }).toThrowError('Token is required');
    const token = 'xxxxxxx';
    store.token = token;
    const expectedState = { ...initialState, token };
    const state = store.getState();
    expect(state).toEqual(expectedState);
    expect(store.token).toEqual(token);
  });
  test('set public key', () => {
    expect(() => {
      store.publicKey = null;
    }).toThrowError('Public key is required');
    const publicKey = 'xxxxxx-xxxxx';
    store.publicKey = publicKey;
    const expectedState = { ...initialState, publicKey };
    const state = store.getState();
    expect(state).toEqual(expectedState);
    expect(store.publicKey).toEqual(publicKey);
  });
});
