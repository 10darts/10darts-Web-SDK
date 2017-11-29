import store from './store';
import { URL_API_V1 } from '../configuration';

function makeHeaders(token) {
  return {
    Authorization: `AppToken ${token}`,
    'Content-Type': 'application/json',
  };
}

export function get(url, token = store.token) {
  const headers = makeHeaders(token);
  return fetch(`${URL_API_V1}${url}`, {
    method: 'GET',
    headers,
  });
}

export function post(url, data = {}, token = store.token) {
  const headers = makeHeaders(token);
  return fetch(`${URL_API_V1}${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
}

export function patch(url, data = {}, token = store.token) {
  const headers = makeHeaders(token);
  return fetch(`${URL_API_V1}${url}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  });
}
