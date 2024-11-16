import type { Node } from '../coreTypes';
import Yoga from '../index';
import { applyStyle, type NodeStyle } from './styleHandler';

export type NodeTree<T extends string> = {
  key: T;
  style?: NodeStyle;
  children?: NodeTree<T>[];
};

export type NodeTreeKeys<T> = T extends NodeTree<infer K> ? K : never;

export function createLayout<T extends string>(styles: NodeTree<T>) {
  return styles;
}

class Layout<T extends string> {
  layout: Record<T, Node>;
  rootKey: T;

  constructor(rootKey: T) {
    const config = Yoga.Config.create();
    config.setPointScaleFactor(0);
    const root = Yoga.Node.create(config);
    this.rootKey = rootKey;
    this.layout = {
      [rootKey]: root,
    } as Record<T, Node>;
  }

  addNodeTo(parentKey: T, key: T, index: number) {
    const parent = this.layout[parentKey];
    const child = Yoga.Node.create();
    parent.insertChild(child, index);
    this.layout[key] = child;
    return child;
  }

  getNode(key: T) {
    return this.layout[key];
  }

  free() {
    this.getNode(this.rootKey).freeRecursive();
  }

  forEach(cb: (node: Node, key: T) => void) {
    for (const key in this.layout) {
      cb(this.layout[key], key);
    }
  }
}

type TreeItem<T extends string> = NodeTree<T> | NodeTree<T>[];

export function generateStyledLayout<T extends string>(layout: NodeTree<T>) {
  const layoutTree = new Layout(layout.key);
  console.log('applying to: ', layout.key);
  applyStyle(layoutTree.layout[layout.key], layout.style);
  (function _parse(
    treeItem: TreeItem<T>,
    index: number,
    isArray: boolean,
    parentKey: T | null,
  ) {
    if (isArray) {
      (treeItem as NodeTree<T>[]).forEach((o, i) => {
        _parse(o, i, false, parentKey);
      });
    } else {
      treeItem = treeItem as NodeTree<T>;
      if (parentKey !== null) {
        const addedNode = layoutTree.addNodeTo(parentKey, treeItem.key, index);
        console.log('applying to: ', treeItem.key);
        applyStyle(addedNode, treeItem.style);
      }
      if (treeItem.children) {
        _parse(treeItem.children, 0, true, treeItem.key);
      }
    }

    return layoutTree;
  })(layout, 0, false, null);

  return layoutTree;
}
