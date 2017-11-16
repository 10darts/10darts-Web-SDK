import fetchMock from 'fetch-mock';
import received from './received';

describe('Received', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  test('Send received to server', () => {
    fetchMock.post('*', 201);
    const token = 'XXXXX';
    const pushCode = 'pushCode';
    const device = 'deviceCode';
    received(pushCode, device, token);
    expect(fetchMock.done()).toBeTruthy();
    expect(fetchMock.called()).toBeTruthy();
    expect(fetchMock.lastUrl()).toContain('/api/v1/pushes/pushCode/received/');
  });
});
