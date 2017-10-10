import { PERSONA } from '../configuration';

export default function() {
  return localStorage.getItem(PERSONA);
}
