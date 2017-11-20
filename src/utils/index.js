import store from './store';
import logger from './logger';
import navigatorLanguage from './navigatorLanguage';
import { get, post } from './api';
import { userAgent, getCodeFromUrl, urlB64ToUint8Array } from './helpers';
import clear from './clear';

export {
  store,
  clear,
  logger,
  get,
  post,
  userAgent,
  getCodeFromUrl,
  urlB64ToUint8Array,
  navigatorLanguage,
};
