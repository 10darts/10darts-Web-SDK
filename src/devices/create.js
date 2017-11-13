import randomize from 'randomatic';
import navigatorLanguage from '../utils/navigatorLanguage';
import userAgent from '../utils/userAgent';
import getToken from '../utils/getToken';
import { getCodeFromUrl } from '../utils/helpers';
import {
  URL_API,
  DEVICE,
  PERSONA,
  LAST_ACCESS,
  CREATE_USER_EVENT,
} from '../configuration';

export default function () {
  const url = `${URL_API}/devices/`;
  const token = getToken();
  const model = userAgent();
  const language = navigatorLanguage();
  console.log('create');
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `AppToken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      platform: 'web',
      token: randomize('*', 30),
      disabled: true,
      model,
      language,
    }),
  }).then((res) => {
    if (res.ok) { return res.json(); }
    throw res;
  }).then(({ code, persona }) => {
    const personaCode = getCodeFromUrl(persona);
    localStorage.setItem(DEVICE, code);
    localStorage.setItem(PERSONA, personaCode);
    localStorage.setItem(LAST_ACCESS, Date.now());
    const event = new Event(CREATE_USER_EVENT);
    document.dispatchEvent(event);
  }).catch((res) => {
    if (res.status === 400) {
      return res.json().then(errors => Promise.reject(errors));
    }
    throw res;
  });
}
