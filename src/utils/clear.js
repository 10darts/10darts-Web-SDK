import unsubscribe from '../push/unsubscribe';
import {
  DEVICE,
  LAST_ACCESS,
} from '../configuration';

export default function clear() {
  unsubscribe();
  localStorage.removeItem(DEVICE);
  localStorage.removeItem(LAST_ACCESS);
  return true;
}
