import fetchMock from 'fetch-mock';
import { store } from '../utils';
import saveKeyInUser from './saveKeyInUser';

describe('Create new key/value', () => {
  beforeEach(() => {
    store.setState({ persona: 'https://10darts.com/api/v1/personas/1234/' });
    fetchMock.post('*', { status: 201 });
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    store.setState({});
  });
  test('create new tag', () => {
    const label = 'label';
    return saveKeyInUser(label).then(() => {
      expect(fetchMock.called()).toBeTruthy();
      expect(JSON.parse(fetchMock.lastOptions().body).key).toEqual({ label });
    });
  });
  test('create new key/value', () => {
    const label = 'label';
    const value = 'value';
    return saveKeyInUser(label, value).then(() => {
      expect(fetchMock.called()).toBeTruthy();
      const body = JSON.parse(fetchMock.lastOptions().body);
      expect(body.key).toEqual({ label });
      expect(body.value).toEqual(value);
      expect(body.kind).toEqual(2);
    });
  });
  test('create new key/value with diferent kind', () => {
    const label = 'label';
    const value = 10;
    const kind = 1;

    return saveKeyInUser(label, value, kind).then(() => {
      expect(fetchMock.called()).toBeTruthy();
      const body = JSON.parse(fetchMock.lastOptions().body);
      expect(body.key).toEqual({ label });
      expect(body.value).toEqual(value);
      expect(body.kind).toEqual(kind);
    });
  });
});
