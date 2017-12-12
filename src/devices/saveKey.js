import { store, logger, post } from '../utils';

export default function saveKey(label, value, kind = 2) {
  const data = {
    device: `/api/v1/devices/${store.device}/`,
    key: { label },
  };
  if (value) {
    data.value = value;
    data.kind = kind;
  }
  return post('/keys/devices/', data)
    .then(() => { logger('Key saved: ', label); });
}
