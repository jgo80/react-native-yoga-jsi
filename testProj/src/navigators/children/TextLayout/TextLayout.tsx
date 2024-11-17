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
import {Button, Dimensions, StyleSheet} from 'react-native';
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

const screenWidth = Dimensions.get('window').width;

type ParaProps = {
  x: Mutable<number>;
  y: Mutable<number>;
  width: Mutable<number>;
};

type RectProps = {
  rect: Mutable<SkRect>;
};

export const TextLayout = () => {
  const lailaFont = useFonts({
    laila: [Laila],
  });

  const width = useSharedValue(screenWidth - 32);

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
            rect: makeMutable(rect(left, top, width, height)),
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
            top,
            left,
            nodeWidth,
            nodeHeight,
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
    runOnJS(updateContWidth)(width.value);
  });

  return (
    <>
      <Canvas style={styles.canvas}>
        <Rect
          style={'stroke'}
          strokeWidth={5}
          color={'red'}
          {...(canvasStyles('container') as RectProps)}
        />
        <Paragraph
          paragraph={paragraph}
          {...(canvasStyles('textNode') as ParaProps)}
        />
      </Canvas>
      <Button
        title={'Halve width'}
        onPress={() => {
          width.value = width.value / 2;
        }}
      />
      <Button
        title={'Double width'}
        onPress={() => {
          width.value = width.value * 2;
        }}
      />
    </>
  );
};

const canvasLayout = createLayout({
  key: 'container',
  style: {
    padding: 16,
    width: screenWidth - 32,
    margin: 16,
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
});
