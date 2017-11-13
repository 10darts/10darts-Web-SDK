import getToken from '../utils/getToken';
import getDeviceCode from '../devices/getDeviceCode';
import {
  URL_API,
} from '../configuration';

export default function (subscription) {
  const url = `${URL_API}/platforms/web/subscriptions/`;
  const device = `/api/v1/devices/${getDeviceCode()}/`;
  const token = getToken();
  const { endpoint, keys: { p256dh }, keys: { auth } } = subscription.toJSON();
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `AppToken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device,
      endpoint,
      p256dh,
      auth,
    }),
  });
}
