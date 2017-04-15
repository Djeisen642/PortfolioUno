import { resolve } from 'path';
export default {
  component(path) {
    return resolve(__dirname, 'components', path);
  },
  image(path) {
    return resolve(__dirname, 'images', path);
  }
};
