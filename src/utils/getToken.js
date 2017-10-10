import { TOKEN } from '../configuration';

export default function getToken() {
  return localStorage.getItem(TOKEN);
}
