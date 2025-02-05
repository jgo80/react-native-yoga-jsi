import Yoga, {
  Align,
  Edge,
  FlexDirection,
  Justify,
  PositionType,
  Unit,
} from 'react-native-yoga-jsi';
import {
  checkLayout,
  getNodes,
  NAPU,
  NPU,
  position,
  roundBy,
  setSize,
  trblwh,
  value,
} from './helpers';
import {RunnerCBHandlers} from './testRunner';

export const sizeTests = ({check, step}: RunnerCBHandlers) => {
  const sizez = [100, '100%', undefined, 'auto'] as NAPU[];

  const resultWidths = [100, 200, 200, 200];
  const resultHeights = [100, 150, 0, 0];
  const sizeUnits = [Unit.Point, Unit.Percent, Unit.Undefined, Unit.Auto];

  const [node, child] = getNodes(2);
  node.setWidth(200);
  node.setHeight(150);

  step('checking width units');

  for (let i = 0; i < sizez.length; i++) {
    child.setWidth(sizez[i]);
    node.calculateLayout(undefined, undefined);
    check(`child width ${sizez[i]}`, child.getComputedWidth(), resultWidths[i]);
    check(
      `width unit check / Value ${sizez[i]}`,
      child.getWidth().unit,
      sizeUnits[i],
    );
  }

  step('checking height units');
  for (let i = 0; i < sizez.length; i++) {
    child.setHeight(sizez[i]);
    node.calculateLayout(undefined, undefined);
    check(
      `child height ${sizez[i]}`,
      child.getComputedHeight(),
      resultHeights[i],
    );
    check(
      `height unit check / Value ${sizez[i]}`,
      child.getHeight().unit,
      sizeUnits[i],
    );
  }
};

export const marginTests = ({check, step}: RunnerCBHandlers) => {
  const mv = 100;
  const marginValues = [15, mv + '%', 'auto', undefined] as NAPU[];

  const results = {
    [Edge.Left]: {
      title: 'left',
      widths: [85, 0, 0, 100],
    },
    [Edge.Top]: {
      title: 'top',
      widths: [100, 100, 100, 100],
    },
    [Edge.Right]: {
      title: 'right',
      widths: [85, 0, 0, 100],
    },
    [Edge.Bottom]: {
      title: 'bottom',
      widths: [100, 100, 100, 100],
    },
    [Edge.Start]: {
      title: 'start',
      widths: [85, 0, 0, 100],
    },
    [Edge.End]: {
      title: 'end',
      widths: [85, 0, 0, 100],
    },
    [Edge.Horizontal]: {
      title: 'horizontal',
      widths: [70, 0, 100, 100], // auto case depands on version
    },
    [Edge.Vertical]: {
      title: 'vertical',
      widths: [100, 100, 100, 100],
    },
    [Edge.All]: {
      title: 'all',
      widths: [70, 0, 100, 100], // auto case depands on version
    },
  } as Record<
    number,
    {
      title: string;
      widths: number[];
    }
  >;

  step('checking margin units');

  for (let i = 0; i < marginValues.length; i++) {
    Object.entries(results).forEach(([edge, {title, widths}]) => {
      const [root, child] = getNodes(2);
      root.setWidth(100);
      root.setHeight(100);

      child.setMargin(Number(edge), marginValues[i]);
      child.setFlex(1);
      root.calculateLayout(undefined, undefined);
      check(
        `child width on /margin ${title} ${marginValues[i]}`,
        child.getComputedWidth(),
        widths[i],
      );
    });
  }

  step('margin unit check done');
};

export const paddingTests = ({check, step}: RunnerCBHandlers) => {
  const paddingValues = [10, '5%', undefined] as NPU[];

  const results = {
    [Edge.Left]: {
      title: 'left',
      widths: [90, 95, 100],
    },
    [Edge.Top]: {
      title: 'top',
      widths: [100, 100, 100],
    },
    [Edge.Right]: {
      title: 'right',
      widths: [90, 95, 100],
    },
    [Edge.Bottom]: {
      title: 'bottom',
      widths: [100, 100, 100],
    },
    [Edge.All]: {
      title: 'all',
      widths: [80, 90, 100],
    },
    [Edge.Horizontal]: {
      title: 'horizontal',
      widths: [80, 90, 100],
    },
    [Edge.Vertical]: {
      title: 'vertical',
      widths: [100, 100, 100],
    },
  };

  step('checking padding units');

  for (let i = 0; i < paddingValues.length; i++) {
    Object.entries(results).forEach(([edge, {title, widths}]) => {
      const [root, parent, child] = getNodes(3);
      setSize(root, 100);
      parent.setFlex(1);
      parent.setPadding(Number(edge), paddingValues[i]);
      child.setFlex(1);
      root.calculateLayout(undefined, undefined);

      check(
        `child width on /padding ${title} ${paddingValues[i]}`,
        child.getComputedWidth(),
        widths[i],
      );
    });
  }

  step('padding unit check done');
};

export const positionTests = ({check, step}: RunnerCBHandlers) => {
  const [root, child1, child2] = getNodes(3, false);
  root.insertChild(child1, 0);
  root.insertChild(child2, 1);
  setSize(root, 100);
  setSize(child1, 30);
  setSize(child2, 50);

  root.setFlexDirection(FlexDirection.Row);
  root.calculateLayout(undefined, undefined);
  step('checking position units');
  check('child1 left in flex row', child1.getComputedLeft(), 0);
  check('child2 left in flex row', child2.getComputedLeft(), 30);

  child1.setPositionType(PositionType.Absolute);
  child1.setPosition(Edge.Right, 10);
  child1.setPosition(Edge.Bottom, 10);
  root.calculateLayout(undefined, undefined);
  check('child1 left after position absolute', child1.getComputedLeft(), 60);
  check(
    'child1 bottom after position absolute',
    child1.getComputedBottom(),
    -10,
  );
  check('child2 position', child2.getComputedLeft(), 0);

  root.setFlexDirection(FlexDirection.ColumnReverse);
  child1.setPositionType(PositionType.Relative);
  root.calculateLayout(undefined, undefined);

  step('checking positions flex column reverse');

  checkLayout(
    child1,
    trblwh(80, -10, -10, -10, 30, 30),
    check,
    'c1 flex col-rev',
  );
  checkLayout(child2, trblwh(20, 0, 30, 0, 50, 50), check, 'c2 flex col-rev');

  step('position unit checking');
  check('child1 position type', ...position.isRelative(child1));
  check('child2 position type', ...position.isStatic(child2));
  // TODO: case where position is child2 is unset // shoult not come static
};

export const miscTests = ({check, step}: RunnerCBHandlers) => {
  const [n1, n2] = getNodes(2, false);
  n1.setFlex(12);
  setSize(n1, 23);
  n1.setPadding(Edge.Left, 10);
  n1.setMargin(Edge.Right, 10);
  n1.setPosition(Edge.Bottom, 10);
  n1.setPosition(Edge.Left, '10%');
  n1.setPositionType(PositionType.Absolute);
  n1.setMarginAuto(Edge.Top);

  n2.copyStyle(n1);
  step('copy style');
  check('cp padding all n1', ...value(n2.getPadding(Edge.All)).isPoint(NaN));
  check('cp padding all n2', ...value(n1.getPadding(Edge.All)).isPoint(NaN));
  check('cp padding left n1', ...value(n2.getPadding(Edge.Left)).isPoint(10));
  check('cp padding left n2', ...value(n1.getPadding(Edge.Left)).isPoint(10));

  check('cp margin right n1', ...value(n2.getMargin(Edge.Right)).isPoint(10));
  check('cp margin right n2', ...value(n1.getMargin(Edge.Right)).isPoint(10));
  check('cp margin all n1', ...value(n2.getMargin(Edge.All)).isPoint(NaN));
  check('cp margin all n2', ...value(n1.getMargin(Edge.All)).isPoint(NaN));
  check('cp margin top n1', ...value(n2.getMargin(Edge.Top)).isAuto());
  check('cp margin top n2', ...value(n1.getMargin(Edge.Top)).isAuto());

  check(
    'cp position bottom n1',
    ...value(n2.getPosition(Edge.Bottom)).isPoint(10),
  );
  check(
    'cp position bottom n2',
    ...value(n1.getPosition(Edge.Bottom)).isPoint(10),
  );

  check('cp flex n1', n2.getFlex(), 12);
  check('cp flex n2', n1.getFlex(), 12);

  check(
    'cp position left n1',
    ...value(n2.getPosition(Edge.Left)).isPercent(10),
  );
  check(
    'cp position left n2',
    ...value(n1.getPosition(Edge.Left)).isPercent(10),
  );

  step('checking border');
  n1.setBorder(Edge.Horizontal, 1);
  check('checking border', n1.getBorder(Edge.Left), NaN);
  n1.calculateLayout(undefined, undefined);
  check('checking computed border 1', n1.getComputedBorder(Edge.Left), 1);

  n1.setBorder(Edge.Left, 2);
  n1.calculateLayout(undefined, undefined);
  check('checking computed border 2', n1.getComputedBorder(Edge.Left), 2);

  // external measure;
  const [n3, n4] = getNodes(2);
  setSize(n3, 100);
  const n5 = getNodes(1)[0];
  n4.setMeasureFunc(() => ({width: 30, height: 20}));
  n3.insertChild(n5, 1);
  setSize(n5, 35);
  n3.calculateLayout(undefined, undefined);
  check('external measure', n5.getComputedTop(), 20);

  // dirty function ...
  let isDirty = false;
  n3.setDirtiedFunc(() => {
    isDirty = true;
  });
  setSize(n5, 11);
  check('is dirtied func called', isDirty, true);
};

export const valueTests = ({check, step}: RunnerCBHandlers) => {
  const [n1] = getNodes(1, false);
  n1.setWidth(10);
  n1.setHeight('20%');
  n1.setMargin(Edge.All, 'auto');

  step('checking value units');
  check('width is point', ...value(n1.getWidth()).isPoint(10));
  check('height is percent', ...value(n1.getHeight()).isPercent(20));
  check('margin is auto', ...value(n1.getMargin(Edge.All)).isAuto());
};

export const alignmentJustificationTests = ({
  check,
  step,
}: RunnerCBHandlers) => {
  const [n1, n2, n3] = getNodes(3, false);
  setSize(n1, 100);
  setSize(n2, 20, 30);
  setSize(n3, 30, 40);
  n1.insertChild(n2, 0);
  n1.insertChild(n3, 1);

  n1.setFlexDirection(FlexDirection.Row);
  step('checking flex direction');
  check('flex direction', n1.getFlexDirection(), FlexDirection.Row);
  n1.setAlignItems(Align.Center);
  check('align items', n1.getAlignItems(), Align.Center);
  n1.setJustifyContent(Justify.Center);
  check('justify content', n1.getJustifyContent(), Justify.Center);
  n1.setAlignContent(Align.Center);
  check('align content', n1.getAlignContent(), Align.Center);
};

export const rootApiTests = ({check, step, is}: RunnerCBHandlers) => {
  step('root api tests');
  const yoga = Yoga;
  is('Yoga exists', yoga);
  const node = Yoga.Node.create();
  is('node created', node);

  const config = Yoga.Config.create();
  is('config created', config);
  for (let i = 1; i < 5; i++) {
    const pointScaleFactor = i / 2;
    config.setPointScaleFactor(pointScaleFactor);
    for (let j = 0; j < 10; j++) {
      const node2 = Yoga.Node.create(config);
      const width = 10 + j / 5;
      node2.setWidth(width);
      node2.calculateLayout(undefined, undefined);
      check(
        `psf: ${pointScaleFactor} width: ${width}`,
        // yoga works with float numbers
        node2.getComputedWidth().toFixed(4),
        roundBy(width, pointScaleFactor).toFixed(4),
      );
    }
  }
};

export const childParentTests = ({check, step}: RunnerCBHandlers) => {
  step('child parent tests');
  const [root, child1] = getNodes(3);
  const child2 = Yoga.Node.create();
  root.insertChild(child1, 1);

  check('root child count', root.getChildCount(), 2);
  const parentOfChidl1 = child1.getParent();
  // @ts-expect-error __node__ is not declared in the types
  check('parent', parentOfChidl1.__node__, n1.__node__);

  const c1 = root.getChild(0);
  const c2 = root.getChild(1);

  // @ts-expect-error __node__ is not declared in the types
  check('is child correct', c1.__node__, child1.__node__);
  // @ts-expect-error __node__ is not declared in the types
  check('is child correct', c2.__node__, child2.__node__);

  root.removeChild(child1);
  check('child recont after removal', root.getChildCount(), 1);
  // @ts-expect-error __node__ is not declared in the types
  check(
    'child reposition after removal',
    root.getChild(0).__node__,
    child2.__node__,
  );
};

// TODO: test flex wrap
// TODO: undefined width, re-insert after freeing
