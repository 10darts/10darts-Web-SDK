import received from '../push/received';
import follow from '../push/follow';

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received');
  // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  // console.log('json', event.data.json)
  const data = event.data ? event.data.json() : {};
  console.log('json', data)
  // const data = event.data.text();
  const {
    code,
    title,
    body,
    badge,
    icon,
    image,
    silent_push: silentPush,
    confirmation_needed: confirmationNeeded,
    url,
    device,
    token,
  } = data;
  const options = {
    body,
    icon,
    badge,
    image,
    data: {
      code,
      url,
      silentPush,
      confirmationNeeded,
      device,
      token,
    },
  };
  if (confirmationNeeded) {
    received(code, device, token);
  }
  if (!silentPush) {
    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.');
  console.log('data', event.notification.data)
  event.notification.close();
  const { data } = event.notification;
  follow(data.code, data.device, data.token);
  if (data.url) {
    event.waitUntil(clients.openWindow(data.url));
  }
});
