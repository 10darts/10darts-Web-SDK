import { post } from '../utils/api';

export default function received(pushCode, deviceCode, token) {
  const url = `/pushes/${pushCode}/received/`;
  const device = `/api/v1/devices/${deviceCode}/`;
  return post(url, { device }, token)
    .then(response => console.log('received', response.status));
}
