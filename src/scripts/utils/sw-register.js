import * as WorkboxWindow from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const wb = new WorkboxWindow.Workbox('/sw.bundle.js');
  try {
    await wb.register();
  // eslint-disable-next-line no-empty
  } catch (error) {

  }
};

export default swRegister;
