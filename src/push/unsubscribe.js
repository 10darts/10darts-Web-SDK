import { registration as swRegistration } from '../ServiceWorker';
import { logger } from '../utils';

export default function unsubscribe() {
  swRegistration().then((registration) => {
    registration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          return subscription.unsubscribe();
        }
        return null;
      })
      .catch(error => logger('Error unsubscribing', error))
      .then(() => {
        logger('User is unsubscribed.');
      });
  });
}
