import {assertDefAndNotNull} from '../assertions';
import {isString, isObject} from 'metal';

export default {
  test(filename, module, magnet) {
    return isObject(module.route) && isString(module.default);
  },
  register(filename, module, magnet) {
    let path = module.route.path;
    let method = module.route.method || 'get';

    assertDefAndNotNull(path, 'Router path must be specified');

    let app = magnet.getServer().getEngine();

    app[method.toLowerCase()](path,
      (req, res) => res.type('html').end(module.default));
  },
};
