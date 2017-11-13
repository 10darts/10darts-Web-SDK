import {
  URL_API,
} from '../configuration';

export default function received(pushCode, deviceCode, token) {
  const url = `${URL_API}/pushes/${pushCode}/received/`;
  const device = `/api/v1/devices/${deviceCode}/`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `AppToken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device,
    }),
  }).then(response => console.log('received', response.status));
}
