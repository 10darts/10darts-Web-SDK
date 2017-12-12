import init from './init';
import { linkDeviceClientData, geolocation, saveKey } from './devices';
import { subscribe, unsubscribe } from './push';
import { registration } from './ServiceWorker';
import { store, clear } from './utils';

window.Tendarts = {
  init,
  linkDeviceClientData,
  subscribe,
  unsubscribe,
  registration,
  clear,
  saveKey,
  geolocation,
  getState() {
    return store.getState();
  },
};
