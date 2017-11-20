import { store, logger, post } from '../utils';

export default function linkDeviceClientData(clientData) {
  return post('/devices/links/', {
    device: `/api/v1/devices/${store.device}/`,
    client_data: clientData,
  }).catch(error => logger(error));
}
