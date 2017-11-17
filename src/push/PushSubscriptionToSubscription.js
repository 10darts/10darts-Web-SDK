export default function PushSubscriptionToSubscription(PushSubscription) {
  const { endpoint, keys: { p256dh }, keys: { auth } } = PushSubscription.toJSON();
  return {
    endpoint,
    p256dh,
    auth,
  };
}
