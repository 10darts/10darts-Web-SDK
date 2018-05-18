import { store, logger, post } from '../utils';

export default function saveKeyInUser(label, value, kind = 2) {
  const data = {
    persona: store.persona,
    key: { label },
  };
  if (value) {
    data.value = value;
    data.kind = kind;
  }
  return post('/keys/personas/', data).then((res) => {
    logger('Key saved: ', label);
    return res;
  });
}
