import { logger } from '../utils';

export default function () {
  return new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      logger('Sevice Worker and Push is supported');
      navigator.serviceWorker
        .register('/10dartsServiceWorker.js')
        .then((registration) => {
          logger('Service Worker is registered', registration);
          resolve(registration);
        })
        .catch(error => logger('Service Worker Error', error));
    } else {
      reject(new Error('Push messaging is not supported'));
    }
  });
}
