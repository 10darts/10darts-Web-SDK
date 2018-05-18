import randomize from 'randomatic';
import PushSubscriptionToSubscription from '../push/PushSubscriptionToSubscription';
import geolocation from './geolocation';
import saveKeyInDevice from './saveKeyInDevice';
import { CREATE_DEVICE_EVENT } from '../configuration';
import { store, post, userAgent, navigatorLanguage } from '../utils';

export default function (PushSubscription, position) {
  if (!PushSubscription) {
    throw new Error('You need a subscription to create device');
  }
  const subscription = PushSubscriptionToSubscription(PushSubscription);
  const url = '/devices/';
  const model = userAgent();
  const language = navigatorLanguage();
  const data = {
    platform: 'web',
    token: randomize('*', 30),
    model,
    language,
    web_subscription: subscription,
  };
  if (position) {
    data.position = {
      type: 'Point',
      coordinates: [position.coords.latitude, position.coords.longitude],
    };
  }
  return post(url, data)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    })
    .then(({ code, persona }) => {
      store.device = code;
      store.persona = persona;
      store.lastAccess = Date.now();
      document.dispatchEvent(new Event(CREATE_DEVICE_EVENT));
      geolocation();
      if (store.key) {
        const { label, value, kind } = store.key;
        saveKeyInDevice(label, value, kind);
      }
    })
    .catch((res) => {
      if (res.status === 400) {
        return res.json().then(errors => Promise.reject(errors));
      }
      throw res;
    });
}
