import PushSubscriptionToSubscription from './PushSubscriptionToSubscription';

describe('PushSubscription to subscription', () => {
  test('Convert object PushSubscription to plain subscription object', () => {
    const expectedSubscription = {
      endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABaDWcB83wZpGXasOFTwXzeCsIr1-aVaeRRxhXGxpFtsHEFCWS7vnhfat26rLM5NHCSigceHboX13jYLno4Fg0KplijVA4PZzTUJZJeENttumd3lMiV3IW9C895lG9xQqT_kT7Y997wMJM5P-r1L32yKmw7ajrBxuHUnx-P3aSL0XA6cTs',
      p256dh: 'BF7hcTIq4Bh1enKARiqpQLUzgH6IPAua6lhoc1iWoYKoZuaVu7XyS69qBq4zFZ73MzPpjtP6EIF',
      auth: 'KPBmsGuHdGGA26iC9Aa14Q',
    };
    const { endpoint, p256dh, auth } = expectedSubscription;
    const PushSubscription = {
      toJSON() {
        return { endpoint, keys: { p256dh, auth } };
      },
    };
    expect(PushSubscriptionToSubscription(PushSubscription)).toEqual(expectedSubscription);
  });
});
