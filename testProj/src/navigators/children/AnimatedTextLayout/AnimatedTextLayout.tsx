import {Canvas, Fill, rect, SkHostRect} from '@shopify/react-native-skia';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  runOnJS,
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  createLayout,
  Edge,
  FlexDirection,
  Justify,
  Node,
  Wrap,
} from 'react-native-yoga-jsi';
import {Slider, Switch, VSpacer} from '../../../components';
import {useAnimatedLayout, useParaRect, useSharedRect, useSize} from './utils';

import {Mutable} from 'react-native-reanimated/lib/typescript/commonTypes';
import {
  DpPosition,
  OutlineRect,
  SkChatBubble,
  SkImage,
} from '../../../components/SkiaComps';
import {BackgroundImage} from './BackgroundImage';
import {useText} from './useText';
import { assets } from '../../../assets';

const applyRect = (node: Node, sharedRect: SharedValue<SkHostRect>) => {
  'worklet';
  const layoutInRoot = node.getLayoutInRoot();
  sharedRect.value = rect(
    layoutInRoot.left,
    layoutInRoot.top,
    layoutInRoot.width,
    layoutInRoot.height,
  );
};

export type ParaRect = {
  x: Mutable<number>;
  y: Mutable<number>;
  width: Mutable<number>;
};

const applyTextLayout = (node: Node, paraProps: ParaRect) => {
  'worklet';
  const layoutInRoot = node.getLayoutInRoot();
  paraProps.x.value = layoutInRoot.left;
  paraProps.y.value = layoutInRoot.top;
  paraProps.width.value = layoutInRoot.width;
};

const spacing = {
  s4: 16,
  s2: 8,
  s3: 12,
};
const outlineWidth = StyleSheet.hairlineWidth;

const outlineProps = {
  outlineWidth,
  outlineColor: '#f00',
};

export const AnimatedTextLayout = () => {
  const progress = useSharedValue(1);
  const canvasSize = useSize();
  const isSnapAnimationActive = useSharedValue(false);
  const containerRect = useSharedRect();
  const child1Container = useSharedRect();
  const child2Container = useSharedRect();
  const img1Rect = useSharedRect();
  const img2Rect = useSharedRect();
  const para1Rect = useParaRect();
  const para2Rect = useParaRect();
  const para1BgRect = useSharedRect();
  const para2BgRect = useSharedRect();
  const p1ChatHeadPosition = useSharedValue<DpPosition>('left-inline');
  const p2ChatHeadPosition = useSharedValue<DpPosition>('right-inline');
  const [isReady, setIsReady] = useState(false);

  const sharedLayout = useAnimatedLayout(layout);
  const {p2, p1} = useText(sharedLayout, isReady);

  const isP1Warpped = useDerivedValue(
    () => para1BgRect.value.y !== img1Rect.value.y,
  );

  const updateLayout = () => {
    'worklet';
    if (!sharedLayout.value) return;
    sharedLayout.value.getNode('root').calculateLayout(undefined, undefined);
    sharedLayout.value.forEach((node, key) => {
      switch (key) {
        case 'root':
          applyRect(node, containerRect);
          break;
        case 'text1-wrapper':
          applyRect(node, para1BgRect);
          break;
        case 'text2-wrapper':
          applyRect(node, para2BgRect);
          break;
        case 'child1':
          applyRect(node, child1Container);
          break;
        case 'child2':
          applyRect(node, child2Container);
          break;
        case 'dp1':
          applyRect(node, img1Rect);
          break;
        case 'dp2':
          applyRect(node, img2Rect);
          break;
        case 'text1':
          applyTextLayout(node, para1Rect);
          break;
        case 'text2':
          applyTextLayout(node, para2Rect);
          break;
      }
    });
  };

  const isFirstUpdateDone = useSharedValue(false);
  useDerivedValue(() => {
    if (isFirstUpdateDone.value || !sharedLayout.value) return;
    const getNode = sharedLayout.value.getNode;
    getNode('root').setDirtiedFunc(updateLayout);
    getNode('child1').setFlexDirection(FlexDirection.Row);
    getNode('child1').setFlexWrap(Wrap.Wrap);
    getNode('child2').setFlexDirection(FlexDirection.Row);
    sharedLayout.value.getNode('child2').setFlexWrap(Wrap.Wrap);
    runOnJS(setIsReady)(true);
    updateLayout();
    isFirstUpdateDone.value = true;
  }, [sharedLayout]);

  useDerivedValue(() => {
    if (!sharedLayout.value) return;
    const root = sharedLayout.value.getNode('root');
    root.setWidth(canvasEffectiveWidth * progress.value);
    root.setMargin(
      Edge.Left,
      outlineWidth / 2 + (canvasEffectiveWidth * (1 - progress.value)) / 2,
    );
    sharedLayout.value.getNode('child2').setJustifyContent(Justify.FlexEnd);
  });

  useDerivedValue(() => {
    if (isP1Warpped.value) {
      p1ChatHeadPosition.value = 'left-above';
      p2ChatHeadPosition.value = 'right-bottom';
    } else {
      p1ChatHeadPosition.value = 'left-inline';
      p2ChatHeadPosition.value = 'right-inline';
    }
  });

  const [showChatBoxOutline, setShowChatBoxOutline] = useState(false);
  const [showContainerOutline, setShowContainerOutline] = useState(false);

  return (
    <View style={style.container}>
      <View style={style.canvasContainer}>
        <Canvas onSize={canvasSize} style={style.canvas}>
          <Fill color="white" />
          <BackgroundImage size={canvasSize} />
          <SkImage applyOvalClip image={assets.dp1} rect={img1Rect} />
          <SkImage applyOvalClip image={assets.dp2} rect={img2Rect} />
          <SkChatBubble
            paragraph={p1}
            backgroundRect={para1BgRect}
            paraRect={para1Rect}
            dpPosition={p1ChatHeadPosition}
          />
          <SkChatBubble
            paragraph={p2}
            backgroundRect={para2BgRect}
            paraRect={para2Rect}
            dpPosition={p2ChatHeadPosition}
          />
          {showChatBoxOutline && (
            <>
              <OutlineRect rect={child2Container} {...outlineProps} />
              <OutlineRect rect={child1Container} {...outlineProps} />
            </>
          )}
          {showContainerOutline && (
            <OutlineRect rect={containerRect} {...outlineProps} />
          )}
        </Canvas>
      </View>
      <Slider
        sliderProgess={progress}
        isSnapAnimationActive={isSnapAnimationActive}
        bounds={{
          left: 0.45,
          right: 1,
        }}
      />
      <VSpacer size={16} />
      <Switch
        value={showContainerOutline}
        update={setShowContainerOutline}
        label="Show Container Outline"
      />
      <Switch
        value={showChatBoxOutline}
        update={setShowChatBoxOutline}
        label="Show chatBubble Outline"
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const canvasWidth = screenWidth - 32;
const canvasEffectiveWidth = canvasWidth - outlineWidth;
const profilePicSize = 40;
const textMinWidth = 150;

const layout = createLayout({
  key: 'root',
  style: {
    width: canvasEffectiveWidth,
    padding: outlineWidth / 2 + spacing.s4,
    margin: outlineWidth / 2,
    gap: spacing.s4,
  },
  children: [
    {
      key: 'child1',
      style: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.s4,
      },
      children: [
        {
          key: 'dp1',
          style: {
            width: profilePicSize,
            height: profilePicSize,
          },
        },
        {
          key: 'text1-wrapper',
          style: {
            flex: 1,
            minWidth: textMinWidth,
            padding: spacing.s4,
          },
          children: [
            {
              key: 'text1',
            },
          ],
        },
      ],
    },
    {
      key: 'child2',
      style: {
        flexDirection: 'row',
        gap: spacing.s4,
      },
      children: [
        {
          key: 'text2-wrapper',
          style: {
            flex: 1,
            minWidth: textMinWidth,
            padding: spacing.s4,
          },
          children: [
            {
              key: 'text2',
            },
          ],
        },
        {
          key: 'dp2',
          style: {
            width: profilePicSize,
            height: profilePicSize,
          },
        },
      ],
    },
  ],
});

const style = StyleSheet.create({
  canvas: {
    width: '100%',
    aspectRatio: 1 / 1.5,
  },
  canvasContainer: {
    paddingHorizontal: spacing.s4,
    marginTop: spacing.s4,
  },
  container: {
    flex: 1,
    gap: spacing.s4,
  },
});

// TODO: add test for aspect ratio
// TODO: add test for flex direction
// TODO: check for flex wrap
