import {
  TOKEN,
  PUBLIC_KEY,
  CREATE_USER_EVENT,
} from './configuration';
import createDevice from './devices/create';
import accessDevice from './devices/access';
import getDeviceCode from './devices/getDeviceCode';
import { subscribe } from './push';

const defaultConfig = {
  publicKey: null,
  token: null,
  autosubscribe: false,
};

export default function init(config = defaultConfig) {
  const { token, autosubscribe, publicKey } = config;
  if (!token) {
    throw new Error('Token is required');
  }
  if (!publicKey) {
    throw new Error('Public key is required');
  }
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(PUBLIC_KEY, publicKey);
  const noDevice = !getDeviceCode();
  if (noDevice) {
    createDevice();
  } else {
    accessDevice();
    subscribe();
  }
  if (autosubscribe) {
    document.addEventListener(CREATE_USER_EVENT, () => subscribe(), false);
  }
}
