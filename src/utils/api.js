import getToken from './getToken';
import { URL_API_V1 } from '../configuration';

function makeHeaders(token) {
  return {
    Authorization: `AppToken ${token}`,
    'Content-Type': 'application/json',
  };
}

export function get(url, token = getToken()) {
  const headers = makeHeaders(token);
  return fetch(`${URL_API_V1}${url}`, {
    method: 'GET',
    headers,
  });
}

export function post(url, data = {}, token = getToken()) {
  const headers = makeHeaders(token);
  return fetch(`${URL_API_V1}${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
}
