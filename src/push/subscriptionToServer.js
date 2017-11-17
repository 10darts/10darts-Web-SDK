import PushSubscriptionToSubscription from './PushSubscriptionToSubscription';
import { post, store } from '../utils';

export default function (PushSubscription, deviceCode = store.device) {
  const url = '/platforms/web/subscriptions/';
  const device = `/api/v1/devices/${deviceCode}/`;
  const subscription = PushSubscriptionToSubscription(PushSubscription);
  const payload = {
    device,
    ...subscription,
  };
  return post(url, payload);
}
