import { store } from './utils';
import { subscribe } from './push';
import registerServiceWorker from './ServiceWorker/registration';

export default function init(config) {
  const {
    token,
    publicKey,
    autosubscribe = false,
    debug = false,
  } = config;
  store.token = token;
  store.publicKey = publicKey;
  store.setState({ debug });
  registerServiceWorker();
  if (autosubscribe) {
    subscribe();
  }
  // document.addEventListener(CREATE_USER_EVENT, () => subscribe(), false);
}
