import randomize from 'randomatic';
import PushSubscriptionToSubscription from '../push/PushSubscriptionToSubscription';
import { CREATE_DEVICE_EVENT } from '../configuration';
import { store, post, userAgent, navigatorLanguage } from '../utils';

export default function (PushSubscription) {
  if (!PushSubscription) { throw new Error('You need a subscription to create device'); }
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
  return post(url, data).then((res) => {
    if (res.ok) { return res.json(); }
    throw res;
  }).then(({ code }) => {
    store.device = code;
    store.lastAccess = Date.now();
    document.dispatchEvent(new Event(CREATE_DEVICE_EVENT));
  }).catch((res) => {
    if (res.status === 400) {
      return res.json().then(errors => Promise.reject(errors));
    }
    throw res;
  });
}
