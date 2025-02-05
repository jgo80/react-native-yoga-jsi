import {DimensionValue, StyleSheet, View} from 'react-native';
import { exist } from './helpers';

type Size = {
  size?: DimensionValue;
};

export const VSpacer = ({size}: Size) => (
  <View style={exist(size) ? {height: size} : styels.vSpacer} />
);
export const HSpacer = ({size}: Size) => (
  <View style={exist(size) ? {width: size} : styels.hSpacer} />
);
export const Spacer = () => <View style={styels.spacer} />;

const styels = StyleSheet.create({
  vSpacer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 2,
  },
  hSpacer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  spacer: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
  },
});
