import {
  BackdropBlur,
  DataSourceParam,
  Image,
  Paragraph,
  Path,
  PathOp,
  rect,
  Rect,
  rrect,
  SkHostRect,
  Skia,
  SkParagraph,
  useImage,
} from '@shopify/react-native-skia';
import React, {useState} from 'react';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {ParaRect} from '../navigators/children/AnimatedTextLayout/AnimatedTextLayout';

type Outline = {
  outlineWidth?: number;
  outlineColor?: string;
};

type ImageProps = {
  image: DataSourceParam;
  applyOvalClip?: boolean;
  rect: SharedValue<SkHostRect>;
};

export const SkImage = ({image, applyOvalClip, rect}: ImageProps) => {
  const skImage = useImage(image);
  const clipPath = useDerivedValue(() => {
    if (!applyOvalClip || !rect) return undefined;
    return Skia.Path.Make().addOval(rect.value);
  });
  const outlinePath = useDerivedValue(() => {
    return clipPath.value || Skia.Path.Make().addRect(rect.value);
  });

  return (
    <>
      <Image image={skImage} clip={clipPath} rect={rect} fit="cover" />
      <Path path={outlinePath} strokeWidth={2} color={'white'} style="stroke" />
    </>
  );
};

type OutlineRectProps = {
  rect: SharedValue<SkHostRect>;
} & Outline;

export const OutlineRect = ({
  rect,
  outlineWidth,
  outlineColor,
}: OutlineRectProps) => {
  return (
    <Rect
      rect={rect}
      strokeWidth={outlineWidth}
      color={outlineColor}
      style="stroke"
    />
  );
};

export type DpPosition =
  | 'left-inline'
  | 'right-inline'
  | 'left-above'
  | 'right-bottom';

type ParaProps = {
  paragraph: SkParagraph | null;
  backgroundRect: SharedValue<SkHostRect>;
  paraRect: ParaRect;
  dpPosition: SharedValue<DpPosition>;
};

export const SkChatBubble = ({
  paragraph,
  backgroundRect,
  paraRect,
  dpPosition,
}: ParaProps) => {
  const subPath = useState(Skia.Path.Make)[0];
  const fullPaht = useState(Skia.Path.Make)[0];

  // useAnimatedReaction
  useDerivedValue(() => {
    fullPaht.reset();
    subPath.reset();

    const rRect = rrect(backgroundRect.value, 16, 16);

    fullPaht.addRRect(rRect);

    let blockX, blockY, blockW, blokcH, circleX, circleY;

    switch (dpPosition.value) {
      case 'left-above':
        blockX = rRect.rect.x;
        blockY = rRect.rect.y - 16;
        blockW = 16;
        blokcH = 32;
        circleX = rRect.rect.x + 16;
        circleY = rRect.rect.y - 16;
        break;

      case 'right-bottom':
        blockX = rRect.rect.x + rRect.rect.width - 16;
        blockY = rRect.rect.y + rRect.rect.height - 16;
        blockW = 16;
        blokcH = 32;
        circleX = rRect.rect.x + rRect.rect.width - 16;
        circleY = rRect.rect.y + rRect.rect.height + 16;
        break;

      case 'left-inline':
        blockX = rRect.rect.x - 16;
        blockY = rRect.rect.y;
        blockW = 16 * 2;
        blokcH = 16;
        circleX = rRect.rect.x - 16;
        circleY = rRect.rect.y + 16;
        break;

      case 'right-inline':
        blockX = rRect.rect.x + rRect.rect.width - 16;
        blockY = rRect.rect.y;
        blockW = 16 * 2;
        blokcH = 16;
        circleX = rRect.rect.x + rRect.rect.width + 16;
        circleY = rRect.rect.y + 16;
        break;
    }

    fullPaht.addRect(rect(blockX, blockY, blockW, blokcH));

    subPath.addCircle(circleX, circleY, 16);
    fullPaht.op(subPath, PathOp.Difference);
  });

  return (
    <>
      <BackdropBlur clip={fullPaht} blur={6} />
      <Path path={fullPaht} color={'#22222270'} />
      <Path path={fullPaht} style={'stroke'} strokeWidth={1} color={'#fff7'} />
      <Paragraph paragraph={paragraph} {...paraRect} />
    </>
  );
};
