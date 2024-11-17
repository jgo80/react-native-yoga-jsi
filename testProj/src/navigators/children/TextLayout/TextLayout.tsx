import {
  Canvas,
  Paragraph,
  rect,
  Rect,
  Skia,
  SkRect,
  useFonts,
} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  makeMutable,
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Mutable} from 'react-native-reanimated/lib/typescript/commonTypes';
import {createLayout, Direction, useStyle} from 'react-native-yoga-jsi';

// @ts-expect-error no ts definitions
import Laila from './Laila.ttf';
import {Button} from '../../../components';

const screenWidth = Dimensions.get('window').width;

type ParaProps = {
  x: Mutable<number>;
  y: Mutable<number>;
  width: Mutable<number>;
};

type RectProps = {
  rect: Mutable<SkRect>;
};

const availableWidht = screenWidth - 32;
const strokeWidth = 4;

export const TextLayout = () => {
  const lailaFont = useFonts({
    laila: [Laila],
  });

  const containerWidth = useSharedValue(availableWidht);

  const paragraph = useMemo(() => {
    if (!lailaFont) return null;

    return Skia.ParagraphBuilder.Make(undefined, lailaFont)
      .pushStyle({
        fontSize: 50,
        fontFamilies: ['Laila'],
        color: Skia.Color('black'),
      })
      .addText('देवनागरी से आत्मा का रिश्ता है।')
      .pop()
      .build();
  }, [lailaFont]);

  const [canvasStyles, setCanvasStyles] = useStyle(
    canvasLayout,
    {
      direction: Direction.LTR,
      onInit: (key, node) => {
        const {top, left, width, height} = node.getComputedLayout();
        if (key === 'textNode') {
          return {
            x: makeMutable(left),
            y: makeMutable(top),
            width: makeMutable(width),
          };
        } else
          return {
            rect: makeMutable(
              // need to make correction for stroke width, unlike react native view boarder expands both inside and outside
              rect(
                left + strokeWidth / 2,
                top + strokeWidth / 2,
                width - strokeWidth,
                height - strokeWidth,
              ),
            ),
          };
      },
      onUpdate: (key, node, value) => {
        const {
          top,
          left,
          width: nodeWidth,
          height: nodeHeight,
        } = node.getLayoutInRoot();
        if (key === 'textNode') {
          const {x, y, width} = value as ParaProps;
          x.value = left;
          y.value = top;
          width.value = nodeWidth;
        } else
          (value as RectProps).rect.value = rect(
            top + strokeWidth / 2,
            left + strokeWidth / 2,
            nodeWidth - strokeWidth,
            nodeHeight - strokeWidth,
          );
      },
      onValueGet: (_key, _node, value) => {
        return value;
      },
      onDepsChange: getNode => {
        if (!paragraph) {
          return;
        }
        const textNode = getNode('textNode');
        textNode.setMeasureFunc(width => {
          paragraph.layout(Math.round(width));
          const height = paragraph.getHeight();
          console.log(width, paragraph.getLongestLine());
          return {
            width: paragraph.getLongestLine(),
            height,
          };
        });
        textNode.markDirty();
      },
    },
    [paragraph],
  );

  const parentNodde = setCanvasStyles('container');

  const updateContWidth = (width: number) => {
    parentNodde.setWidth(width);
  };

  useDerivedValue(() => {
    runOnJS(updateContWidth)(containerWidth.value);
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.innerCont}>
        <Canvas style={styles.canvas}>
          <Rect
            style={'stroke'}
            strokeWidth={strokeWidth}
            color={'red'}
            {...(canvasStyles('container') as RectProps)}
          />
          <Paragraph
            paragraph={paragraph}
            {...(canvasStyles('textNode') as ParaProps)}
          />
        </Canvas>
        <Button
          title={'Set width to half'}
          onPress={() => {
            containerWidth.value = availableWidht / 2;
          }}
        />
        <Button
          title={'Wet width to 75%'}
          onPress={() => {
            containerWidth.value = availableWidht * 0.75;
          }}
        />
        <Button
          title={'Full width'}
          onPress={() => {
            containerWidth.value = availableWidht;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const canvasLayout = createLayout({
  key: 'container',
  style: {
    padding: 16,
    width: screenWidth - 32,
  },
  children: [
    {
      key: 'textNode',
      style: {
        width: '100%',
      },
    },
  ],
});

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  innerCont: {
    padding: 16,
    gap: 16,
    flex: 1,
  },
});
