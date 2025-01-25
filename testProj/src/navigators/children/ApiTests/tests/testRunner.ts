export type Primitive = string | number | boolean | null | undefined;
export type Data = {
  title: string;
  pass: boolean;
  timeTaken: number;
  expected?: Primitive;
  actual?: Primitive;
  type: 'step' | 'check' | 'is';
};

function TestRunner() {
  let lastTime = 0;
  const getTimeElapsed = () => {
    const now = performance.now();
    const timeElapsed = now - lastTime;
    lastTime = now;
    return timeElapsed;
  };
  const data: Data[] = [];

  const start = () => {
    data.length = 0;
    lastTime = performance.now();
  };
  const step = (title: string) => {
    data.push({
      title,
      pass: true,
      timeTaken: getTimeElapsed(),
      type: 'step',
    });
  };

  const check = <T extends Primitive>(
    title: string,
    value: T,
    checkWith: T,
  ) => {
    const dataItem: Data = {
      title,
      pass: Object.is(value, checkWith), // to include NaN equality
      timeTaken: getTimeElapsed(),
      type: 'check',
    };

    if (!dataItem.pass) {
      dataItem.expected = checkWith;
      dataItem.actual = value;
    }

    data.push(dataItem);
  };

  const is = <T>(title: string, value: T) => {
    data.push({
      title,
      pass: !!value,
      timeTaken: getTimeElapsed(),
      type: 'is',
    });
  };

  const getResults = () => data;

  return {
    is,
    step,
    check,
    start,
    getResults,
  };
}

type TestRunner = ReturnType<typeof TestRunner>;

export type RunnerCBHandlers = {
  is: TestRunner['is'];
  step: TestRunner['step'];
  check: TestRunner['check'];
};

type RunnerCB = (handlers: RunnerCBHandlers) => void;

export function testRunner(performTests: RunnerCB) {
  const testRunner = TestRunner();
  testRunner.start();
  performTests(testRunner);
  return testRunner.getResults();
}
