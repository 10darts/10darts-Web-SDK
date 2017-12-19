import init from './init';
import { linkDeviceClientData, geolocation, saveKey, isRegistered } from './devices';
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
  isRegistered,
  getState() {
    return store.getState();
  },
};
