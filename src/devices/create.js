import randomize from 'randomatic';
import PushSubscriptionToSubscription from '../push/PushSubscriptionToSubscription';
import { store, post, userAgent, navigatorLanguage } from '../utils';

export default function (PushSubscription) {
  if (!PushSubscription) { throw new Error('You need a subscription to create device'); }
  const url = '/devices/';
  const model = userAgent();
  const language = navigatorLanguage();
  const subscription = PushSubscriptionToSubscription(PushSubscription);
  const data = {
    platform: 'web',
    token: randomize('*', 30),
    disabled: true,
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
  }).catch((res) => {
    if (res.status === 400) {
      return res.json().then(errors => Promise.reject(errors));
    }
    throw res;
  });
}
