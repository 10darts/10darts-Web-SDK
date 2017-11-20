import swRegistration from '../ServiceWorker/registration';

export default function unsubscribe() {
  swRegistration().then((registration) => {
    registration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          return subscription.unsubscribe();
        }
        return null;
      })
      .catch(error => console.log('Error unsubscribing', error))
      .then(() => {
        console.log('User is unsubscribed.');
      });
  });
}
