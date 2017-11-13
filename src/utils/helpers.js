export function getCodeFromUrl(url) {
  try {
    return url.match(/([^/]*)\/*$/)[1];
  } catch (error) {
    return null;
  }
}

export function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i + 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
