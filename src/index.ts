import { NativeModules } from 'react-native';
import type { Yoga } from './coreTypes';
// import * as derived from './derived';
// import * as coreTypes from './coreTypes';

(function () {
  NativeModules.YogaJSI.install();
})();

//@ts-expect-error gotta fix it later
const YogaModule: {
  Yoga: Yoga;
} = global;

export default YogaModule.Yoga;
export * from './derived';
export * from './coreTypes';

// module.exports = YogaModule.Yoga;
// module.exports.default = YogaModule.Yoga;
// module.exports.derived = derived;
// module.exports.coreTypes = coreTypes;
