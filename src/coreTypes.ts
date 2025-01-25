export enum Align {
  Auto = 0,
  FlexStart = 1,
  Center = 2,
  FlexEnd = 3,
  Stretch = 4,
  Baseline = 5,
  SpaceBetween = 6,
  SpaceAround = 7,
  SpaceEvenly = 8,
}

export enum BoxSizing {
  BorderBox = 0,
  ContentBox = 1,
}

export enum Dimension {
  Width = 0,
  Height = 1,
}

export enum Direction {
  Inherit = 0,
  LTR = 1,
  RTL = 2,
}

export enum Display {
  Flex = 0,
  None = 1,
  Contents = 2,
}

export enum Edge {
  Left = 0,
  Top = 1,
  Right = 2,
  Bottom = 3,
  Start = 4,
  End = 5,
  Horizontal = 6,
  Vertical = 7,
  All = 8,
}

export enum Errata {
  None = 0,
  StretchFlexBasis = 1,
  AbsolutePositionWithoutInsetsExcludesPadding = 2,
  AbsolutePercentAgainstInnerSize = 4,
  All = 2147483647,
  Classic = 2147483646,
}

export enum ExperimentalFeature {
  WebFlexBasis = 0,
}

export enum FlexDirection {
  Column = 0,
  ColumnReverse = 1,
  Row = 2,
  RowReverse = 3,
}

export enum Gutter {
  Column = 0,
  Row = 1,
  All = 2,
}

export enum Justify {
  FlexStart = 0,
  Center = 1,
  FlexEnd = 2,
  SpaceBetween = 3,
  SpaceAround = 4,
  SpaceEvenly = 5,
}

export enum LogLevel {
  Error = 0,
  Warn = 1,
  Info = 2,
  Debug = 3,
  Verbose = 4,
  Fatal = 5,
}

export enum MeasureMode {
  Undefined = 0,
  Exactly = 1,
  AtMost = 2,
}

export enum NodeType {
  Default = 0,
  Text = 1,
}

export enum Overflow {
  Visible = 0,
  Hidden = 1,
  Scroll = 2,
}

export enum PositionType {
  Static = 0,
  Relative = 1,
  Absolute = 2,
}

export enum Unit {
  Undefined = 0,
  Point = 1,
  Percent = 2,
  Auto = 3,
}

export enum Wrap {
  NoWrap = 0,
  Wrap = 1,
  WrapReverse = 2,
}

type Layout = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

type AbsoluteLayout = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Size = {
  width: number;
  height: number;
};

export type Value = {
  unit: Unit;
  value: number;
};

export type Config = {
  free(): void;
  isExperimentalFeatureEnabled(feature: ExperimentalFeature): boolean;
  setExperimentalFeatureEnabled(
    feature: ExperimentalFeature,
    enabled: boolean,
  ): void;
  setPointScaleFactor(factor: number): void;
  getErrata(): Errata;
  setErrata(errata: Errata): void;
  useWebDefaults(): boolean;
  setUseWebDefaults(useWebDefaults: boolean): void;
};

export type DirtiedFunction = (node: Node) => void;

export type MeasureFunction = (
  width: number,
  widthMode: MeasureMode,
  height: number,
  heightMode: MeasureMode,
) => Size;

export type Node = {
  calculateLayout(
    width: number | 'auto' | undefined,
    height: number | 'auto' | undefined,
    direction?: Direction,
  ): void;
  copyStyle(node: Node): void;
  free(): void;
  freeRecursive(): void;
  getAlignContent(): Align;
  getAlignItems(): Align;
  getAlignSelf(): Align;
  getAspectRatio(): number;
  getBorder(edge: Edge): number;
  getChild(index: number): Node;
  getChildCount(): number;
  // safe edge
  getComputedBorder(edge: Edge.Left | Edge.Right | Edge.Bottom | Edge.Top | Edge.Start | Edge.End): number;
  getComputedBottom(): number;
  getComputedHeight(): number;
  getComputedLayout(): Layout;
  getLayoutInRoot(): AbsoluteLayout;
  getComputedLeft(): number;
  getComputedMargin(edge: Edge): number;
  getComputedPadding(edge: Edge): number;
  getComputedRight(): number;
  getComputedTop(): number;
  getComputedWidth(): number;
  getDirection(): Direction;
  getDisplay(): Display;
  getFlexBasis(): Value;
  getFlexDirection(): FlexDirection;
  getFlexGrow(): number;
  getFlex(): number;
  getFlexShrink(): number;
  getFlexWrap(): Wrap;
  getHeight(): Value;
  getJustifyContent(): Justify;
  getGap(gutter: Gutter): Value;
  getMargin(edge: Edge): Value;
  getMaxHeight(): Value;
  getMaxWidth(): Value;
  getMinHeight(): Value;
  getMinWidth(): Value;
  getOverflow(): Overflow;
  getPadding(edge: Edge): Value;
  getParent(): Node | null;
  getPosition(edge: Edge): Value;
  getPositionType(): PositionType;
  getBoxSizing(): BoxSizing;
  getWidth(): Value;
  insertChild(child: Node, index: number): void;
  isDirty(): boolean;
  isReferenceBaseline(): boolean;
  markDirty(): void;
  hasNewLayout(): boolean;
  markLayoutSeen(): void;
  removeChild(child: Node): void;
  reset(): void;
  setAlignContent(alignContent: Align): void;
  setAlignItems(alignItems: Align): void;
  setAlignSelf(alignSelf: Align): void;
  setAspectRatio(aspectRatio: number | undefined): void;
  setBorder(edge: Edge, borderWidth: number | undefined): void;
  setDirection(direction: Direction): void;
  setDisplay(display: Display): void;
  setFlex(flex: number | undefined): void;
  setFlexBasis(flexBasis: number | 'auto' | `${number}%` | undefined): void;
  setFlexBasisPercent(flexBasis: number | undefined): void;
  setFlexBasisAuto(): void;
  setFlexDirection(flexDirection: FlexDirection): void;
  setFlexGrow(flexGrow: number | undefined): void;
  setFlexShrink(flexShrink: number | undefined): void;
  setFlexWrap(flexWrap: Wrap): void;
  setHeight(height: number | 'auto' | `${number}%` | undefined): void;
  setIsReferenceBaseline(isReferenceBaseline: boolean): void;
  setHeightAuto(): void;
  setHeightPercent(height: number | undefined): void;
  setJustifyContent(justifyContent: Justify): void;
  setGap(gutter: Gutter, gapLength: number | `${number}%` | undefined): Value;
  setGapPercent(gutter: Gutter, gapLength: number | undefined): Value;
  setMargin(
    edge: Edge,
    margin: number | 'auto' | `${number}%` | undefined,
  ): void;
  setMarginAuto(edge: Edge): void;
  setMarginPercent(edge: Edge, margin: number | undefined): void;
  setMaxHeight(maxHeight: number | `${number}%` | undefined): void;
  setMaxHeightPercent(maxHeight: number | undefined): void;
  setMaxWidth(maxWidth: number | `${number}%` | undefined): void;
  setMaxWidthPercent(maxWidth: number | undefined): void;
  setDirtiedFunc(dirtiedFunc: DirtiedFunction | null): void;
  setMeasureFunc(measureFunc: MeasureFunction | null): void;
  setMinHeight(minHeight: number | `${number}%` | undefined): void;
  setMinHeightPercent(minHeight: number | undefined): void;
  setMinWidth(minWidth: number | `${number}%` | undefined): void;
  setMinWidthPercent(minWidth: number | undefined): void;
  setOverflow(overflow: Overflow): void;
  setPadding(edge: Edge, padding: number | `${number}%` | undefined): void;
  setPaddingPercent(edge: Edge, padding: number | undefined): void;
  setPosition(edge: Edge, position: number | `${number}%` | undefined): void;
  setPositionPercent(edge: Edge, position: number | undefined): void;
  setPositionType(positionType: PositionType): void;
  setPositionAuto(edge: Edge): void;
  setBoxSizing(boxSizing: BoxSizing): void;
  setWidth(width: number | 'auto' | `${number}%` | undefined): void;
  setWidthAuto(): void;
  setWidthPercent(width: number | undefined): void;
  unsetDirtiedFunc(): void;
  unsetMeasureFunc(): void;
  setAlwaysFormsContainingBlock(alwaysFormsContainingBlock: boolean): void;
};

export type Yoga = {
  Config: {
    create(): Config;
    destroy(config: Config): void;
  };
  Node: {
    create(config?: Config): Node;
    createDefault(): Node;
    createWithConfig(config: Config): Node;
    destroy(node: Node): void;
  };
};
