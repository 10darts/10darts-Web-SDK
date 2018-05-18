import { store, logger, post } from '../utils';

export default function linkDeviceClientData(clientData) {
  return post('/devices/links/', {
    device: `/api/v1/devices/${store.device}/`,
    client_data: clientData,
  })
    .then(res => res.json())
    .then((json) => {
      store.perona = json.persona;
    })
    .catch(error => logger(error));
}
