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
    scope = '/',
    serviceWorkerPath = '/',
    cache,
    key,
  } = config;
  store.token = token;
  store.publicKey = publicKey;
  if (key) {
    store.key = key;
  }
  store.setState({
    debug,
    cache,
    scope,
    serviceWorkerPath,
    autosubscribe,
    geolocation,
  });
  if (autosubscribe) {
    subscribe();
  } else {
    registerServiceWorker();
  }
  access();
}
