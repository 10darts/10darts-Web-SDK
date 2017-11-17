import swRegistration from '../ServiceWorker/registration';
import subscriptionToServer from './subscriptionToServer';
import { create as createDevice } from '../devices';
import { store, urlB64ToUint8Array, logger } from '../utils';

export default function () {
  swRegistration()
    .then((registration) => {
      registration.pushManager.getSubscription()
        .then((serviceWorkerSubscription) => {
          if (!serviceWorkerSubscription) {
            logger('Create subscription');
            const applicationServerKey = urlB64ToUint8Array(store.publicKey);
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey,
            })
              .then((pushSubscription) => {
                logger('User is subscribed.', pushSubscription);
                createDevice().then(() => subscriptionToServer(pushSubscription));
              });
          } else {
            logger('User has subscription.');
          }
        })
        .catch(err => logger('Failed to subscribe the user: ', err));
    });
}
