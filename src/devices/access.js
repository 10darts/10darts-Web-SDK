
import { logger, post, store } from '../utils';

const TWO_HOURS_MILISECONS = 7200000;

export default function () {
  const now = Date.now();
  const hasDevice = store.device !== null;
  const registerAccess = store.lastAccess && store.lastAccess < (now - TWO_HOURS_MILISECONS);
  if (hasDevice && registerAccess) {
    const url = `/devices/${store.device}/access/`;
    post(url).then(() => {
      store.lastAccess = now;
      logger('Update last access');
    });
  }
}
