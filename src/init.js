import { store } from './utils';
import { subscribe } from './push';
import { access } from './devices';
import { register as registerServiceWorker } from './ServiceWorker';

export default function init(config) {
  const {
    token,
    publicKey,
    autosubscribe = false,
    geolocation = false,
    debug = false,
    key,
  } = config;
  store.token = token;
  store.publicKey = publicKey;
  if (key) {
    store.key = key;
  }
  store.setState({ debug, autosubscribe, geolocation });
  if (autosubscribe) {
    subscribe();
  } else {
    registerServiceWorker();
  }
  access();
}
