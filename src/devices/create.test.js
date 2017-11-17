import fetchMock from 'fetch-mock';
import { store } from '../utils';
import createDevice from './create';

const responseBody = {
  id: 59973,
  code: 'o1AJHk',
  platform: 'web',
  persona: 'http://localhost:8888/api/v1/personas/RNcG3C/',
  disabled: true,
  model: '',
  version: null,
  sdk: null,
  language: 'en',
  position: null,
  country: null,
  is_active: false,
  is_alive: true,
  created: '2017-11-17T12:13:30.191309Z',
  tags: [],
};

describe('Create device', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    store.setState({});
  });
  test('create device without subscription', () => {
    fetchMock.post('*', {
      status: 201,
      body: responseBody,
      headers: { 'content-type': 'application/json' },
    });
    expect(() => createDevice()).toThrow();
  });
  test('create device with subscription', () => {
    const subscription = {
      auth: 'KPBmsGuHdGGA26iC9Aa14Q',
      endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABaDWcB83wZpGXasOFTwXzeCsIr1-aVaeRRxhXGxpFtsHEFCWS7vnhfat26rLM5NHCSigceHboX13jYLno4Fg0KplijVA4PZzTUJZJeENttumd3lMiV3IW9C895lG9xQqT_kT7Y997wMJM5P-r1L32yKmw7ajrBxuHUnx-P3aSL0XA6cTs',
      p256dh: 'BF7hcTIq4Bh1enKARiqpQLUzgH6IPAua6lhoc1iWoYKoZuaVu7XyS69qBq4zFZ73MzPpjtP6EIF',
    };
    fetchMock.post('*', {
      status: 201,
      body: { ...responseBody, subscription },
      headers: { 'content-type': 'application/json' },
    });
    const { endpoint, p256dh, auth } = subscription;
    const PushSubscription = {
      toJSON() {
        return { endpoint, keys: { p256dh, auth } };
      },
    };
    return createDevice(PushSubscription).then(() => {
      expect(fetchMock.done()).toBeTruthy();
      expect(fetchMock.called()).toBeTruthy();
      expect(fetchMock.lastUrl()).toContain('/devices/');
      expect(store.device).toBe(responseBody.code);
      expect(store.lastAccess).not.toBe(null);
      expect(JSON.parse(fetchMock.lastOptions().body).web_subscription).toEqual(subscription);
    });
  });
});
