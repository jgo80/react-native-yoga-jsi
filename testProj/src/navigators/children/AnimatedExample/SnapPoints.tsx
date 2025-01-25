/* eslint-disable react-native/no-color-literals */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Button} from '../../../components';

const snapPoints = [0.25, 0.45, 0.8, 1];

export const SnapPoints = ({
  sliderProgess,
}: {
  sliderProgess: SharedValue<number>;
}) => {
  return (
    <View style={styels.cont}>
      {snapPoints.map(p => (
        <Button
          style={styels.button}
          key={p}
          title={
            <>
              {p * 100}
              <Text style={styels.tSmall}> %</Text>
            </>
          }
          onPress={() => {
            sliderProgess.value = p;
          }}
        />
      ))}
    </View>
  );
};

const styels = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 8,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  button: {
    width: 76,
  },
  tSmall: {
    fontSize: 11,
  },
});
