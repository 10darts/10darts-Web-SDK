import { store } from '../utils';

export default function logger(...messages) {
  if (store.debug) {
    console.log(messages);
  }
}
