import { logger } from '../utils';

export default function geolocation() {
  logger('Getting geolocation');
  return navigator.geolocation.getCurrentPosition((position) => {
    logger('Geolocation', position);
    logger(position.coords.latitude, position.coords.longitude);
    return position;
  });
}
