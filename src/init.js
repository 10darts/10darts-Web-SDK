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
  } = config;
  store.token = token;
  store.publicKey = publicKey;
  store.setState({ debug, autosubscribe, geolocation });
  if (autosubscribe) {
    subscribe();
  } else {
    registerServiceWorker();
  }
  access();
}
