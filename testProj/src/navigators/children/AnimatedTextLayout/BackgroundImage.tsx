import {Image, useImage, rect} from '@shopify/react-native-skia';
import {useDerivedValue} from 'react-native-reanimated';
import {Mutable} from 'react-native-reanimated/lib/typescript/commonTypes';
import { assets } from '../../../assets';

export const BackgroundImage = ({
  size,
}: {
  size: Mutable<{width: number; height: number}>;
}) => {
  const iamge = useImage(assets.background);
  const imgRect = useDerivedValue(() =>
    rect(0, 0, size.value.width, size.value.height),
  );

  return <Image image={iamge} rect={imgRect} fit="cover" />;
};
