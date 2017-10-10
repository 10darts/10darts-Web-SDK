import swRegistration from '../ServiceWorker/registration';
import getPublicKey from '../utils/getPublicKey';
import subscriptionToServer from './subscriptionToServer';
import { urlB64ToUint8Array } from '../utils/helpers';

export default function () {
  console.log('subscribe');
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
                console.log('User is subscribed.', subscription);
                console.log(JSON.stringify(subscription));
                subscriptionToServer(subscription);
              });
          } else {
            console.log('User has subscription.');
          }
        })
        .catch(err => console.log('Failed to subscribe the user: ', err));
    });
}
