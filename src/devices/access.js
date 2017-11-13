import getDeviceCode from './getDeviceCode';
import getToken from '../utils/getToken';
import {
  URL_API,
  LAST_ACCESS,
} from '../configuration';

const TWO_HOURS_MILISECONS = 7200000;

export default function () {
  const lastAccess = localStorage.getItem(LAST_ACCESS);
  if (lastAccess && lastAccess > (Date.now() - TWO_HOURS_MILISECONS)) { return; }
  const token = getToken();
  const device = getDeviceCode();
  const url = `${URL_API}/devices/${device}/access/`;
  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `AppToken ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(() => localStorage.setItem(LAST_ACCESS, Date.now()));
}
