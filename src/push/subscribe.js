import swRegistration from '../ServiceWorker/registration';
import { create as createDevice } from '../devices';
import { store, urlB64ToUint8Array, logger } from '../utils';
// import subscriptionToServer from './subscriptionToServer';

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
                createDevice(pushSubscription)
                  .then(() => logger('Subscription saved'));
                // createDevice()
                // .then(() => subscriptionToServer(pushSubscription));
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
