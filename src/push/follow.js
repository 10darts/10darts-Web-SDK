import { logger, post } from '../utils';

export default function follow(pushCode, deviceCode, token) {
  const url = `/pushes/${pushCode}/follow/`;
  const device = `/api/v1/devices/${deviceCode}/`;

  return post(url, { device }, token)
    .then(response => logger('follow', response.status));
}
