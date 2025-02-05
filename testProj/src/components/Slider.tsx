/* eslint-disable react-native/no-color-literals */
import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  clamp,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const totalDragDis = screenWidth - 32 - 16 - 10;

export const Slider = ({
  sliderProgess,
  isSnapAnimationActive,
  bounds,
}: {
  sliderProgess: SharedValue<number>;
  isSnapAnimationActive: SharedValue<boolean>;
  bounds: {
    left: number;
    right: number;
  };
}) => {
  const drag = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          isSnapAnimationActive.value = false;
        })
        .onChange(e => {
          sliderProgess.value = clamp(
            sliderProgess.value + e.changeX / totalDragDis,
            bounds.left,
            bounds.right,
          );
        })
        .onFinalize(() => (isSnapAnimationActive.value = true)),
    [],
  );

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: isSnapAnimationActive.value
          ? withTiming(sliderProgess.value * totalDragDis)
          : sliderProgess.value * totalDragDis,
      },
      {rotate: '15deg'},
    ],
  }));

  const leftInactivePartWidth = totalDragDis * bounds.left + 8;
  const rightInactivePartWidth = totalDragDis * (1 - bounds.right) + 8;

  return (
    <View style={styles.line}>
      <View
        style={[styles.inactiveSliderLeft, {width: leftInactivePartWidth}]}
      />
      <View
        style={[styles.inactiveSliderRight, {width: rightInactivePartWidth}]}
      />
      <GestureHandlerRootView>
        <GestureDetector gesture={drag}>
          <Animated.View style={[styles.dragHandle, rStyle]} />
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 5,
    backgroundColor: 'tomato',
    marginTop: 32,
    marginHorizontal: 16,
    paddingHorizontal: 8,
  },
  dragHandle: {
    position: 'absolute',
    width: 10,
    height: 30,
    backgroundColor: 'black',
    top: -12.5,
  },
  inactiveSliderLeft: {
    position: 'absolute',
    backgroundColor: '#000a',
    height: '100%',
  },
  inactiveSliderRight: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#000a',
    height: '100%',
  },
});
