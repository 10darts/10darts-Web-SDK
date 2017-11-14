import getDeviceCode from './getDeviceCode';
import { post } from '../utils/api';
import {
  LAST_ACCESS,
} from '../configuration';

const TWO_HOURS_MILISECONS = 7200000;

export default function () {
  const lastAccess = localStorage.getItem(LAST_ACCESS);
  if (lastAccess && lastAccess > (Date.now() - TWO_HOURS_MILISECONS)) { return; }
  const device = getDeviceCode();
  const url = `/devices/${device}/access/`;
  post(url).then(() => localStorage.setItem(LAST_ACCESS, Date.now()));
}
