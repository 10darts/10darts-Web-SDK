import { getCodeFromUrl, urlB64ToUint8Array } from './helpers';

describe('Helpers', () => {
  test('Extract a code from a url', () => {
    const url = '/devices/antonio/';
    const expectedCode = 'antonio';
    expect(getCodeFromUrl(url)).toBe(expectedCode);
  });
  test('Convert url b64 to uint 8 array', () => {
    const url = 'BGxe9KMqRt-WmBW2uUBS02olCJBiB0HsK4Y9-e-16P2bgXnFH9vB_5cFl6vTnj5YlcTMnHOnH9CCtWOlgJWjN8c';
    const Uint8Values = [4, 108, 94, 244, 163, 42, 70, 223, 150, 152, 21, 182,
      185, 64, 82, 211, 106, 37, 8, 144, 98, 7, 65, 236, 43, 134, 61, 249, 239,
      181, 232, 253, 155, 129, 121, 197, 31, 219, 193, 255, 151, 5, 151, 171,
      211, 158, 62, 88, 149, 196, 204, 156, 115, 167, 31, 208, 130, 181, 99,
      165, 128, 149, 163, 55, 199];
    const expectedUint8 = new Uint8Array(Uint8Values);
    expect(urlB64ToUint8Array(url)).toEqual(expectedUint8);
  });
});
