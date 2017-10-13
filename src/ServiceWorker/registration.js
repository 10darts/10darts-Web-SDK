let registration;
export default function () {
  return new Promise((resolve) => {
    if (registration) {
      console.log('You are registered');
      resolve(registration);
    }
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Sevice Worker and Push is supported');
      navigator.serviceWorker.register('/10dartsServiceWorker.js')
        .then((swRegistration) => {
          console.log('Service Worker is registered', swRegistration);
          registration = swRegistration;
          resolve(swRegistration);
        })
        .catch(error => console.log('Service Worker Error', error));
    } else {
      console.warn('Push messaging is not supported');
    }
  });
}
