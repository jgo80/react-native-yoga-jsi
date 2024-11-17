/* eslint-disable react-native/no-color-literals */
import {Canvas, Fill, Rect, RoundedRect} from '@shopify/react-native-skia';
import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  cancelAnimation,
  makeMutable,
  runOnJS,
  runOnUI,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Mutable} from 'react-native-reanimated/lib/typescript/commonTypes';
import {createLayout, useStyle, NodeTreeKeys} from 'react-native-yoga-jsi';
import {Slider} from './Slider';
import {InfoBox} from './InfoBox';
import {SnapPoints} from './SnapPoints';

const screenWidth = Dimensions.get('window').width;

const BoundingRect = (props: {
  x: Mutable<number>;
  y: Mutable<number>;
  width: Mutable<number>;
  height: Mutable<number>;
}) => {
  return (
    <RoundedRect
      {...props}
      r={8}
      color={'black'}
      style={'stroke'}
      strokeWidth={3}></RoundedRect>
  );
};

export function AnimatedExample() {
  const isSnapAnimationActive = useSharedValue(true);
  const [getStylesOf, layoutTree] = useStyle(initialLayout, {
    onInit: (_key, node) => {
      const size = node.getLayoutInRoot();
      return {
        x: makeMutable(size.left),
        y: makeMutable(size.top),
        width: makeMutable(size.width),
        height: makeMutable(size.height),
      };
    },
    onUpdate: (_key, node, {x, y, width, height}) => {
      const size = node.getLayoutInRoot();
      runOnUI(() => {
        'worklet';
        if (isSnapAnimationActive.value) {
          x.value = withTiming(size.left);
          y.value = withTiming(size.top);
          width.value = withTiming(size.width);
          height.value = withTiming(size.height);
        } else {
          x.value = size.left;
          y.value = size.top;
          width.value = size.width;
          height.value = size.height;
        }
      })();
    },
    onUnmount: (_key, _node, value) => {
      cancelAnimation(value.x);
      cancelAnimation(value.y);
      cancelAnimation(value.width);
      cancelAnimation(value.height);
    },
    onValueGet: (_key, _node, value) => {
      return value;
    },
  });

  const innerContainer = layoutTree('innterContainer');
  const sliderProgess = useSharedValue(1);

  const updateWid = (wid: number) => {
    innerContainer.setWidth((wid + '%') as `${number}%`);
  };

  useDerivedValue(() => {
    runOnJS(updateWid)(sliderProgess.value * 100);
  }, [sliderProgess]);

  React.useEffect(() => {
    // to fix a probable bug in skia for ios
    sliderProgess.value = 0.999;
  }, []);

  return (
    <View style={styles.screenCont}>
      <DemoCanvas getStylesOf={getStylesOf} />
      <InfoBox />
      <SnapPoints sliderProgess={sliderProgess} />
      <Slider
        isSnapAnimationActive={isSnapAnimationActive}
        sliderProgess={sliderProgess}
      />
    </View>
  );
}

type getStylesOf = (key: NodeTreeKeys<typeof initialLayout>) => {
  x: Mutable<number>;
  y: Mutable<number>;
  width: Mutable<number>;
  height: Mutable<number>;
};

const DemoCanvas = ({getStylesOf: getXYWH}: {getStylesOf: getStylesOf}) => {
  return (
    <Canvas style={styles.canvas}>
      <Fill color={'red'} />
      <Rect {...getXYWH('root')} color="white" />
      <BoundingRect {...getXYWH('innterContainer')} />
      <Rect {...getXYWH('redBox')} color="red" />
      <Rect {...getXYWH('greenBox')} color="green" />
      <Rect {...getXYWH('tealBox')} color="teal" />
      <Rect {...getXYWH('orangeBox')} color="orange" />
    </Canvas>
  );
};

const initialLayout = createLayout({
  key: 'root',
  style: {
    width: screenWidth,
    height: 272,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'column',
  },
  children: [
    {
      key: 'innterContainer',
      style: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        gap: 16,
      },
      children: [
        {
          key: 'redBox',
          style: {
            width: '20%',
            minWidth: 50,
            height: 40,
          },
        },
        {
          key: 'greenBox',
          style: {
            width: '40%',
            minWidth: 50,
            height: 40,
          },
        },
        {
          key: 'tealBox',
          style: {
            width: '20%',
            minWidth: 50,
            height: 40,
          },
        },
        {
          key: 'orangeBox',
          style: {
            width: '60%',
            minWidth: 50,
            height: 40,
          },
        },
      ],
    },
  ],
});

const styles = StyleSheet.create({
  canvas: {
    width: screenWidth,
    height: 260 + 12,
  },
  screenCont: {
    backgroundColor: '#ddd',
    flex: 1,
  },
});
