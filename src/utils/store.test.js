import store from './store';

const initialState = {
  publicKey: null,
  token: null,
  device: null,
  autosubscribe: false,
  debug: false,
};
describe('Store', () => {
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
});
