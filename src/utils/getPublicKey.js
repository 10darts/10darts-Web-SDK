import { PUBLIC_KEY } from '../configuration';

export default function getPublicKey() {
  return localStorage.getItem(PUBLIC_KEY);
}
