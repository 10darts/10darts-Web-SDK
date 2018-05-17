import { logger, store } from '../utils';

export default function () {
  return new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      logger('Sevice Worker and Push is supported');
      const { scope, serviceWorkerPath } = store;
      logger('Service Worker scope', scope);
      const serviceWorkerRoute = `${serviceWorkerPath}10dartsServiceWorker.js`;
      navigator.serviceWorker
        .register(serviceWorkerRoute, { scope })
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
