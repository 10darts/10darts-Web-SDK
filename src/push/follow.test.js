import fetchMock from 'fetch-mock';
import follow from './follow';

describe('Follow', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  test('Send follow to server', () => {
    fetchMock.post('*', 201);
    const token = 'XXXXX';
    const pushCode = 'pushCode';
    const device = 'deviceCode';
    follow(pushCode, device, token);
    expect(fetchMock.done()).toBeTruthy();
    expect(fetchMock.lastUrl()).toContain('/api/v1/pushes/pushCode/follow/');
  });
});
