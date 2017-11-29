import fetchMock from 'fetch-mock';
import { get, post, patch } from './api';

describe('API base calls', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  test('GET should have Token XXXXXXX', () => {
    fetchMock.get('*', 200);
    const token = 'XXXXX';
    get('/', token);
    expect(fetchMock.lastOptions().headers.Authorization).toBe(`AppToken ${token}`);
  });
  test('POST should have Token XXXXXXX', () => {
    fetchMock.post('*', 201, {});
    const token = 'XXXXX';
    post('/', {}, token);
    expect(fetchMock.lastOptions().headers.Authorization).toBe(`AppToken ${token}`);
  });
  test('PATCH should have Token XXXXXXX', () => {
    fetchMock.patch('*', 201, {});
    const token = 'XXXXX';
    patch('/', {}, token);
    expect(fetchMock.lastOptions().headers.Authorization).toBe(`AppToken ${token}`);
  });
});
