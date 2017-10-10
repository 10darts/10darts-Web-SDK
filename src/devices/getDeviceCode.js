import { DEVICE } from '../configuration';

export default function () {
  return localStorage.getItem(DEVICE);
}
