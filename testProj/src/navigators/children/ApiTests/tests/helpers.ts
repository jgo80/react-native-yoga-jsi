import Yoga, {Node, PositionType, Unit, Value} from 'react-native-yoga-jsi';

type Prettify<T> = {
  [K in keyof T]: T[K];
};

export const getNodes = (length = 2, inserted = true) => {
  const nodes = Array.from({length}, Yoga.Node.create);
  if (inserted) {
    for (let i = 0; i < length - 1; i++) {
      nodes[i].insertChild(nodes[i + 1], 0);
    }
  }
  return nodes;
};

export const setSize = (node: Node, w: number, h?: number) => {
  node.setWidth(w);
  node.setHeight(h ?? w);
};

export const trblwh = (
  top: number,
  right: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
) => ({top, right, bottom, left, width, height});

type CheckFn = (title: string, value: number, checkWith: number) => void;

export const checkLayout = (
  node: Node,
  expected: ReturnType<typeof trblwh>,
  checkWith: CheckFn,
  id: string,
) => {
  const layout = node.getComputedLayout();
  checkWith(id + ' top', layout.top, expected.top);
  checkWith(id + ' right', layout.right, expected.right);
  checkWith(id + ' bottom', layout.bottom, expected.bottom);
  checkWith(id + ' left', layout.left, expected.left);
  checkWith(id + ' width', layout.width, expected.width);
  checkWith(id + ' height', layout.height, expected.height);
};

const positionStrMap = {
  [PositionType.Static]: 'static',
  [PositionType.Relative]: 'relative',
  [PositionType.Absolute]: 'absolute',
};

export const position = {
  isRelative: (node: Node) =>
    [
      positionStrMap[node.getPositionType()],
      positionStrMap[PositionType.Relative],
    ] as const,
  isAbsolute: (node: Node) =>
    [
      positionStrMap[node.getPositionType()],
      positionStrMap[PositionType.Absolute],
    ] as const,
  isStatic: (node: Node) =>
    [
      positionStrMap[node.getPositionType()],
      positionStrMap[PositionType.Static],
    ] as const,
};

const strValue = (value: number, unit: Unit) => {
  switch (unit) {
    case Unit.Undefined:
      return `v: ${value} u: undefined`;
    case Unit.Point:
      return `v: ${value} u: point`;
    case Unit.Percent:
      return `v: ${value} u: percent`;
    case Unit.Auto:
      return `v: ${value} u: auto`;
  }
};

export const value = (value: Value) => {
  return {
    isUndefined: () =>
      [
        strValue(value.value, Unit.Undefined),
        strValue(NaN, Unit.Undefined),
      ] as const,
    isPoint: (val: number) =>
      [strValue(value.value, Unit.Point), strValue(val, Unit.Point)] as const,
    isPercent: (val: number) =>
      [
        strValue(value.value, Unit.Percent),
        strValue(val, Unit.Percent),
      ] as const,
    isAuto: () =>
      [strValue(value.value, Unit.Auto), strValue(NaN, Unit.Auto)] as const,
  };
};

export type NPU = number | `${number}%` | undefined;
export type NAPU = Prettify<NPU | 'auto'>;

export const roundBy = (v: number, n: number) => Math.round(v * n) / n;
