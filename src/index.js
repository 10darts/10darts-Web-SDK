import init from './init';
import linkDeviceClientData from './devices/linkClientData';
import getDeviceCode from './devices/getDeviceCode';
import getPersonaCode from './devices/getPersonaCode';
import subscribe from './push/subscribe';
import unsubscribe from './push/unsubscribe';
import registration from './ServiceWorker/registration';

window.Tendarts = {
  init,
  linkDeviceClientData,
  getDeviceCode,
  getPersonaCode,
  subscribe,
  unsubscribe,
  registration,
};
