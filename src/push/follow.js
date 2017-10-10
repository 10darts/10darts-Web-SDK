import {
  URL_API,
} from '../configuration';

export default function follow(pushCode, deviceCode, token) {
  const url = `${URL_API}/pushes/${pushCode}/follow/`;
  const device = `/api/v1/devices/${deviceCode}/`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device,
    }),
  }).then(response => console.log('follow', response.status));
}
