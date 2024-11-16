import { useEffect, useMemo, useRef, type DependencyList } from 'react';
import { Direction, type Node } from '../coreTypes';
import { generateStyledLayout, type NodeTree } from './utils';
import { useOnDepsChange } from './useOnDepsChaneg';

type GetNodeFn<T extends string> = (key: T) => Record<T, Node>[T];

type Config<T extends string, U, V> = {
  // size?: Size;
  direction?: Direction;
  onInit: (nodeKey: T, node: Node) => U;
  onUpdate?: (nodeKey: T, node: Node, value: U) => void;
  onUnmount?: (nodeKey: T, node: Node, value: U) => void;
  onValueGet: (nodeKey: T, node: Node, value: U) => V;
  onDepsChange?: (getNodeFn: GetNodeFn<T>) => void;
};

// type Size = {
//   width: number;
//   height: number;
// };

type RefRecord<T extends string, U> = Record<T, U>;

export function useStyle<T extends string, U, V>(
  layoutTree: NodeTree<T>,
  config: Config<T, U, V>,
  deps: DependencyList = [],
) {
  const initialValueStore = useRef<RefRecord<T, U>>({} as RefRecord<T, U>);

  const [parsedLayout, getNodeStyle] = useMemo(() => {
    const root = layoutTree.key;
    const parsedLayout = generateStyledLayout(layoutTree);

    const rootNode = parsedLayout.getNode(root);

    rootNode.calculateLayout(undefined, undefined);
    parsedLayout.forEach((node, key) => {
      initialValueStore.current[key] = config.onInit(key, node);
    });

    if (config.onUpdate !== undefined) {
      rootNode.setDirtiedFunc(() => {
        rootNode.calculateLayout('auto', 'auto', config.direction);
        parsedLayout.forEach((node, key) => {
          config.onUpdate!(key, node, initialValueStore.current[key]);
        });
      });
    }

    const getNodeStyle = (key: T) => {
      return config.onValueGet(
        key,
        parsedLayout.getNode(key),
        initialValueStore.current[key],
      );
    };

    return [parsedLayout, getNodeStyle] as const;
  }, []);

  const getNodeFn = (key: T) => parsedLayout.getNode(key);

  useOnDepsChange(config.onDepsChange, deps, getNodeFn);

  useEffect(() => {
    return () => {
      if (config.onUnmount !== undefined) {
        parsedLayout.forEach((node, key) => {
          config.onUnmount!(key, node, initialValueStore.current[key]);
        });
      }
      parsedLayout.free();
    };
  }, []);

  return [getNodeStyle, getNodeFn] as const;
}
