import { store } from '../utils';

export default function isRegistered() {
  return !!store.device;
}
