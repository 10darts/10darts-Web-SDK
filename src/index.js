import init from './init';
import linkDeviceClientData from './devices/linkClientData';
import subscribe from './push/subscribe';
import unsubscribe from './push/unsubscribe';
import registration from './ServiceWorker/registration';
import { store, clear } from './utils';

window.Tendarts = {
  init,
  linkDeviceClientData,
  subscribe,
  unsubscribe,
  registration,
  clear,
  getState() {
    return store.getState();
  },
};
