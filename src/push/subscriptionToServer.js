import getDeviceCode from '../devices/getDeviceCode';
import { post } from '../utils/api';

export default function (subscription, deviceCode = getDeviceCode()) {
  const url = '/platforms/web/subscriptions/';
  const device = `/api/v1/devices/${deviceCode}/`;
  const { endpoint, keys: { p256dh }, keys: { auth } } = subscription.toJSON();
  const payload = {
    device,
    endpoint,
    p256dh,
    auth,
  };
  return post(url, payload);
}
