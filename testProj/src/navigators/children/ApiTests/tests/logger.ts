import { Data } from "./testRunner";

const colors = {
  reset: { fg: '\x1b[0m', bg: '\x1b[0m' },
  black: { fg: '\x1b[30m', bg: '\x1b[40m' },
  red: { fg: '\x1b[31m', bg: '\x1b[41m' },
  green: { fg: '\x1b[32m', bg: '\x1b[42m' },
  yellow: { fg: '\x1b[33m', bg: '\x1b[43m' },
  blue: { fg: '\x1b[34m', bg: '\x1b[44m' },
  magenta: { fg: '\x1b[35m', bg: '\x1b[45m' },
  cyan: { fg: '\x1b[36m', bg: '\x1b[46m' },
  white: { fg: '\x1b[37m', bg: '\x1b[47m' },
  brightBlack: { fg: '\x1b[90m', bg: '\x1b[100m' },
  brightRed: { fg: '\x1b[91m', bg: '\x1b[101m' },
  brightGreen: { fg: '\x1b[92m', bg: '\x1b[102m' },
  brightYellow: { fg: '\x1b[93m', bg: '\x1b[103m' },
  brightBlue: { fg: '\x1b[94m', bg: '\x1b[104m' },
  brightMagenta: { fg: '\x1b[95m', bg: '\x1b[105m' },
  brightCyan: { fg: '\x1b[96m', bg: '\x1b[106m' },
  brightWhite: { fg: '\x1b[97m', bg: '\x1b[107m' },
};

type Color = keyof typeof colors;

const colored = (
  str: string | undefined,
  color: Color,
  isBackground = false
) => {
  if (isBackground) {
    return colors[color].bg + str + colors.reset.bg;
  }
  return colors[color].fg + str + colors.reset.fg;
};

export const logFomatted = (data: Data[], logOnlyFails: boolean) => {
  const maxLen = data.reduce((acc, d) => Math.max(acc, d.title.length), 0);
  const line = (len = 21, char = '─') => console.log(char.repeat(maxLen + len));

  const nextLine = (times = 1) => {
    for (let i = 0; i < times; i++) {
      console.log();
    }
  };
  nextLine(3);

  const cell = (str: string, len = maxLen) => str + ' '.repeat(len - str.length);

  const result = (res: boolean) => (res ? '✅' : '❌');
  let isFirstDone = false;
  const drawFirstLine = () => {
    if (!isFirstDone) {
      line();
      isFirstDone = true;
    }
  };

  data.forEach(d => {
    if (!d.pass || !logOnlyFails) {
      drawFirstLine();
      if (d.type === 'step') {
        console.log(` 🪜  ${cell(d.title)}`);
      } else console.log(
        ` 📐 ${cell(d.title)}   `,
        ...result(d.pass),
        ` ${(d.timeTaken * 1000).toFixed(1).padStart(5, ' ')} μs\n`
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      d.pass && line();
    }
    if (!d.pass) {
      drawFirstLine();
      nextLine();
      console.log(
        ` 🔍 Expected: ${colored(
          d.expected?.toString(),
          'green',
          false
        )}\tFound: ${colored(d.actual?.toString(), 'red', false)}\n`
      );
      line();
    }
  });

  const nonStepItems = data.filter(i => i.type !== 'step');

  const total = nonStepItems.length.toString();
  const passes = nonStepItems.filter(d => d.pass).length.toString();
  //@ts-expect-error number coercion
  const fails = (total - passes).toString();

  const borderColor: Color = 'brightYellow';

  const bl1 = 11 + total.length;
  const bl2 = 10 + passes.length;
  const bl3 = 9 + fails.length;

  console.log(
    colored(
      ' ┏' +
      '━'.repeat(bl1) +
      '┳' +
      '━'.repeat(bl2) +
      '┳' +
      '━'.repeat(bl3) +
      '┓',
      borderColor
    )
  );
  console.log(
    colored(' ┃', borderColor),
    'Total:  ',
    colored(total, 'brightBlue'),
    colored('┃', borderColor),
    'Pass:  ',
    colored(passes, 'green'),
    colored('┃', borderColor),
    'Fail: ',
    colored(fails, 'red'),
    colored('┃', borderColor)
  );
  console.log(
    colored(
      ' ┗' +
      '━'.repeat(bl1) +
      '┻' +
      '━'.repeat(bl2) +
      '┻' +
      '━'.repeat(bl3) +
      '┛',
      borderColor
    )
  );
};

