import swRegistration from '../ServiceWorker/registration';
import getPublicKey from '../utils/getPublicKey';
import subscriptionToServer from './subscriptionToServer';
import { urlB64ToUint8Array, logger } from '../utils';

export default function () {
  logger('subscribe');
  swRegistration()
    .then((registration) => {
      registration.pushManager.getSubscription()
        .then((isSubscribed) => {
          if (!isSubscribed) {
            const publickey = getPublicKey();
            const applicationServerKey = urlB64ToUint8Array(publickey);
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey,
            })
              .then((subscription) => {
                logger('User is subscribed.', subscription);
                logger(JSON.stringify(subscription));
                subscriptionToServer(subscription);
              });
          } else {
            logger('User has subscription.');
          }
        })
        .catch(err => logger('Failed to subscribe the user: ', err));
    });
}
