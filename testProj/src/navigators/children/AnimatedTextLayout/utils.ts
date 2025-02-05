import {rect} from '@shopify/react-native-skia';
import {useEffect, useState} from 'react';
import {
  cancelAnimation,
  makeMutable,
  runOnUI,
  useSharedValue,
} from 'react-native-reanimated';
import {applyStyle, Node, NodeTree} from 'react-native-yoga-jsi';

type TreeItem<T extends string> = NodeTree<T> | NodeTree<T>[];

function Layout<T extends string>(rootKey: T) {
  'worklet';
  const config = Yoga.Config.create();
  config.setPointScaleFactor(0);
  const root = Yoga.Node.create(config);
  const layout = {
    [rootKey]: root,
  } as Record<T, Node>;
  return {
    layout,
    rootKey,
    getNode: (key: T) => {
      'worklet';
      return layout[key];
    },
    addNodeTo: (parentKey: T, key: T, index: number) => {
      'worklet';
      const parent = layout[parentKey];
      const child = Yoga.Node.create();
      parent.insertChild(child, index);
      layout[key] = child;
      return child;
    },
    free: () => {
      'worklet';
      root.freeRecursive();
    },
    forEach: (cb: (node: Node, key: T) => void) => {
      'worklet';
      for (const key in layout) {
        cb(layout[key], key);
      }
    },
  };
}

export function generateStyledLayout<T extends string>(layout: NodeTree<T>) {
  'worklet';
  const layoutTree = Layout(layout.key);
  applyStyle(layoutTree.layout[layout.key], layout.style);
  function _parse<U extends T>(
    treeItem: TreeItem<U>,
    index: number,
    isArray: boolean,
    parentKey: U | null,
  ) {
    'worklet';
    if (isArray) {
      (treeItem as NodeTree<U>[]).forEach((o, i) => {
        _parse(o, i, false, parentKey);
      });
    } else {
      treeItem = treeItem as NodeTree<U>;
      if (parentKey !== null) {
        const addedNode = layoutTree.addNodeTo(parentKey, treeItem.key, index);
        applyStyle(addedNode, treeItem.style);
      }
      if (treeItem.children) {
        _parse(treeItem.children, 0, true, treeItem.key);
      }
    }

    return layoutTree;
  }

  _parse(layout, 0, false, null);

  return layoutTree;
}

export const useAnimatedLayout = <T extends string>(layout: NodeTree<T>) => {
  type StyledLayout = ReturnType<typeof generateStyledLayout<T>>;

  const parsedLayout = useSharedValue<StyledLayout | null>(null);
  // just to run only once
  useState(() =>
    runOnUI(() => {
      'worklet';
      parsedLayout.value = generateStyledLayout(layout);
    })(),
  );

  return parsedLayout;
};

const useCleanUp = (cb: () => void) => useEffect(() => cb, []);

export const useSharedRect = (x = 0, y = 0, width = 0, height = 0) => {
  const mutableRect = useState(() => makeMutable(rect(x, y, width, height)))[0];
  useCleanUp(() => cancelAnimation(mutableRect));
  return mutableRect;
};

export const useParaRect = () => {
  const paraRect = useState(() => ({
    x: makeMutable(0),
    y: makeMutable(0),
    width: makeMutable(0),
  }))[0];

  useCleanUp(() => {
    cancelAnimation(paraRect.x);
    cancelAnimation(paraRect.y);
    cancelAnimation(paraRect.width);
  });
  return paraRect;
};

export const useSize = () => {
  const sharedSize = useState(() => makeMutable({width: 0, height: 0}))[0];
  useCleanUp(() => cancelAnimation(sharedSize));
  return sharedSize;
};
