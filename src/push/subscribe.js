import { registration as swRegistration } from '../ServiceWorker';
import { create as createDevice } from '../devices';
import subscriptionToServer from './subscriptionToServer';
import { store, urlB64ToUint8Array, logger } from '../utils';

export default function () {
  swRegistration()
    .then((registration) => {
      registration.pushManager.getSubscription()
        .then((serviceWorkerSubscription) => {
          if (!serviceWorkerSubscription) {
            logger('Getting subscription');
            const applicationServerKey = urlB64ToUint8Array(store.publicKey);
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey,
            })
              .then((pushSubscription) => {
                logger('Push subscription', pushSubscription);
                if (store.device) {
                  subscriptionToServer(pushSubscription);
                } else {
                  createDevice(pushSubscription)
                    .then(() => subscriptionToServer(pushSubscription))
                    .then(() => logger('Subscription saved'));
                }
              });
          } else {
            logger('Push subscription exists');
            if (!store.device) {
              createDevice(serviceWorkerSubscription)
                .then(() => logger('Subscription saved'));
            }
          }
        })
        .catch(err => logger('Failed to subscribe the user: ', err));
    });
}
