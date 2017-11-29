import { unsubscribe } from '../push';
import { store } from '../utils';

export default function clear() {
  unsubscribe();
  store.device = null;
  store.lastAccess = null;
}
