import { getCodeFromUrl } from '../utils/helpers';
import getToken from '../utils/getToken';
import getDeviceCode from './getDeviceCode';
import {
  PERSONA,
  URL_API,
} from '../configuration';

export default function linkDeviceClientData(clientData) {
  const device = getDeviceCode();
  const token = getToken();
  const url = `${URL_API}/devices/links/`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      device: `/api/v1/devices/${device}/`,
      client_data: clientData,
    }),
  }).then(res => res.json())
    .then(({ code, persona }) => {
      const personaCode = getCodeFromUrl(persona);
      localStorage.setItem(PERSONA, personaCode);
      return {
        device: code,
        persona: personaCode,
      };
    }).catch(error => console.error(error));
}
