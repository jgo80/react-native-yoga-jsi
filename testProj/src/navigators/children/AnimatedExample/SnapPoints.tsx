/* eslint-disable react-native/no-color-literals */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SharedValue} from 'react-native-reanimated';

const snapPoints = [0.25, 0.45, 0.8, 1];

export const SnapPoints = ({
  sliderProgess,
}: {
  sliderProgess: SharedValue<number>;
}) => {
  return (
    <View style={styels.cont}>
      {snapPoints.map(p => (
        <TouchableOpacity
          onPress={() => {
            sliderProgess.value = p;
          }}
          key={p}>
          <Text style={styels.text}>
            {p * 100}
            <Text style={styels.tSmall}> %</Text>
          </Text>
        </TouchableOpacity>
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
  text: {
    fontSize: 14,
    backgroundColor: 'black',
    width: 56,
    height: 30,
    lineHeight: 29,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
  tSmall: {
    fontSize: 11,
  },
});
