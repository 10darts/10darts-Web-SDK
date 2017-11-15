import unsubscribe from '../push/unsubscribe';
import {
  DEVICE,
  PERSONA,
  TOKEN,
  LAST_ACCESS,
  PUBLIC_KEY,
} from '../configuration';

export default function clear() {
  unsubscribe();
  localStorage.removeItem(DEVICE);
  localStorage.removeItem(PERSONA);
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(LAST_ACCESS);
  localStorage.removeItem(PUBLIC_KEY);
  return true;
}
