import received from '../push/received';
import follow from '../push/follow';

function ramdomDelay() {
  const MAX_DELAY = 1000;
  return Math.floor(Math.random() * MAX_DELAY);
}

function getData(data) {
  try {
    return data.json();
  } catch (e) {
    return {};
  }
}

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received');
  const data = getData(event.data);
  // console.log('json', data);
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
    const delay = ramdomDelay();
    setTimeout(() => received(code, device, token), delay);
  }
  if (!silentPush) {
    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  const { data } = event.notification;
  follow(data.code, data.device, data.token);
  if (data.url) {
    event.waitUntil(clients.openWindow(data.url));
  }
});
