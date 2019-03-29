import config from '../config/config';

// eslint-disable-next-line no-unused-vars
const logger = (title, msg = '', type = 'default') => {
  // eslint-disable-next-line no-extra-boolean-cast
  if (config.showLog === 'YES') {
    // if (type === 'error') {
    // }
    let output = `[${title}]`;
    if (msg) {
      output += `: ${msg}`;
    }
    // eslint-disable-next-line no-console
    console.log(output);
  }
};
export default logger;
