import {Skia, useFonts} from '@shopify/react-native-skia';
import {assets} from '../../../assets';
import {useMemo} from 'react';
import {Node} from 'react-native-yoga-jsi';
import {runOnUI, SharedValue} from 'react-native-reanimated';

const textStyles = {
  fontSize: 16,
  fontFamilies: ['Laila'],
  color: Skia.Color('White'),
};

type Layout = SharedValue<{
  getNode: (key: 'text1' | 'text2' | 'root') => Node;
  free: () => void;
} | null>;

export const useText = (layout: Layout, ready: boolean) => {
  const font = useFonts({
    laila: [assets.font],
  });

  const paragraphs = useMemo(() => {
    if (!font || !ready) return;

    const p1 = Skia.ParagraphBuilder.Make(undefined, font)
      .pushStyle(textStyles)
      .addText(assets.text1)
      .pop()
      .build();
    const p2 = Skia.ParagraphBuilder.Make(undefined, font)
      .pushStyle(textStyles)
      .addText(assets.text2)
      .pop()
      .build();

    const measureFnP1 = (width: number) => {
      'worklet';
      p1.layout(width);
      return {
        width: p1.getLongestLine(),
        height: p1.getHeight(),
      };
    };

    const measureFnP2 = (width: number) => {
      'worklet';
      p2.layout(width);
      return {
        width: p2.getLongestLine(),
        height: p2.getHeight(),
      };
    };

    runOnUI(() => {
      'worklet';
      const textNode1 = layout.value!.getNode('text1');
      textNode1.setMeasureFunc(measureFnP1);
      textNode1.markDirty();
      const textNode2 = layout.value!.getNode('text2');
      textNode2.setMeasureFunc(measureFnP2);
      textNode2.markDirty();
    })();
    return {
      p1,
      p2,
    };
  }, [font, ready]);

  return {
    p1: paragraphs?.p1 || null,
    p2: paragraphs?.p2 || null,
  };
};
