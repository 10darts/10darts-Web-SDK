import { store } from '../utils';
import { DEVICE } from '../configuration';

export default function () {
  return store.getState().device || localStorage.getItem(DEVICE);
}
