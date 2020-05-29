const { error, alert, defaultModules } = require('@pnotify/core');
import * as PNotifyMobile from '@pnotify/mobile';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

defaultModules.set(PNotifyMobile, {});

const options = {
  delay: 5000,
  maxTextHeight: 0,
};

export function errorNotice(message) {
  error({ ...options, text: message });
}

export function alertNotice(message) {
  alert({ ...options, text: message });
}
