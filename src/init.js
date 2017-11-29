import { store } from './utils';
import { subscribe } from './push';
import { access } from './devices';
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
  store.setState({ debug, autosubscribe });
  if (autosubscribe) {
    subscribe();
  } else {
    registerServiceWorker();
  }
  access();
  // document.addEventListener(CREATE_USER_EVENT, () => subscribe(), false);
}
