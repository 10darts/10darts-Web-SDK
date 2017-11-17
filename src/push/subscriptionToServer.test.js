import fetchMock from 'fetch-mock';
import { store } from '../utils';
import subscriptionToServer from './subscriptionToServer';

describe('Subscription to Server', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('Send susbscriptoin to server', () => {
    store.setState({ token: 'xxxxx', device: 'deviceCode' });
    fetchMock.post('*', 201);
    const device = '/api/v1/devices/deviceCode/';
    const expectedBody = {
      endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABaDWcB83wZpGXasOFTwXzeCsIr1-aVaeRRxhXGxpFtsHEFCWS7vnhfat26rLM5NHCSigceHboX13jYLno4Fg0KplijVA4PZzTUJZJeENttumd3lMiV3IW9C895lG9xQqT_kT7Y997wMJM5P-r1L32yKmw7ajrBxuHUnx-P3aSL0XA6cTs',
      p256dh: 'BF7hcTIq4Bh1enKARiqpQLUzgH6IPAua6lhoc1iWoYKoZuaVu7XyS69qBq4zFZ73MzPpjtP6EIF',
      auth: 'KPBmsGuHdGGA26iC9Aa14Q',
      device,
    };
    const { endpoint, p256dh, auth } = expectedBody;
    const PushSubscription = {
      toJSON() {
        return { endpoint, keys: { p256dh, auth } };
      },
    };
    subscriptionToServer(PushSubscription);
    expect(fetchMock.done()).toBeTruthy();
    expect(fetchMock.called()).toBeTruthy();
    expect(fetchMock.lastUrl()).toContain('/platforms/web/subscriptions/');
    expect(JSON.parse(fetchMock.lastOptions().body)).toEqual(expectedBody);
  });
});
