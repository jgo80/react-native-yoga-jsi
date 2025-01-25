import { NativeModules } from 'react-native';
import type { Yoga as YogaType } from './coreTypes';

(function () {
  NativeModules.YogaJSI.install();
})();

declare global {  
  const Yoga: YogaType;
}


export default Yoga;
export * from './derived';
export * from './coreTypes';

// module.exports = YogaModule.Yoga;
// module.exports.default = YogaModule.Yoga;
// module.exports.derived = derived;
// module.exports.coreTypes = coreTypes;
