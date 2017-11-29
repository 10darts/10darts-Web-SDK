import { logger, store, patch } from '../utils';

export default function geolocation(device = store.device) {
  logger('Getting geolocation');
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      logger('Geolocation', coords);
      const position = {
        type: 'Point',
        coordinates: [
          coords.longitude,
          coords.latitude,
        ],
      };
      const url = `/devices/${device}/`;
      patch(url, { position })
        .then(() => logger('Position saved'));
    });
  }
}
