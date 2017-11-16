import randomize from 'randomatic';
import navigatorLanguage from '../utils/navigatorLanguage';
import { getCodeFromUrl, userAgent } from '../utils/helpers';
import { post } from '../utils/api';
import {
  DEVICE,
  PERSONA,
  LAST_ACCESS,
  CREATE_USER_EVENT,
} from '../configuration';

export default function () {
  const model = userAgent();
  const language = navigatorLanguage();
  const data = {
    platform: 'web',
    token: randomize('*', 30),
    disabled: true,
    model,
    language,
  };
  const url = '/devices/';
  return post(url, data).then((res) => {
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
