import {testRunner} from './testRunner';
import {
  marginTests,
  miscTests,
  paddingTests,
  sizeTests,
  positionTests,
  valueTests,
  alignmentJustificationTests,
} from './testCases';

export const runTest = () =>
  testRunner(props => {
    sizeTests(props);
    marginTests(props);
    paddingTests(props);
    positionTests(props);
    miscTests(props);
    valueTests(props);
    alignmentJustificationTests(props);
  });
