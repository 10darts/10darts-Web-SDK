import { TOKEN } from '../configuration';
import store from './store';

export default function getToken() {
  return store.getState().token || localStorage.getItem(TOKEN);
}
