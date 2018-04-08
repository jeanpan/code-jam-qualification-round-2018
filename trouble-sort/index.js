'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.trim().split('\n').map(str => str.trim());

  main();
});

const readLine = () => {
  return inputString[currentLine++];
};

const algo = (n, values) => {
  let done = false;
  while (!done) {
    done = true;
    for (let i = 0; i < n - 2; i++) {
      if (values[i] > values[i + 2]) {
        done = false;
        // swap
        let tmp = values[i];
        values[i] = values[i + 2];
        values[i + 2] = tmp;
      }
    }
  }
  const firstError = (values) => {
    for (let i = 0; i < n - 1; i++) {
      if (values[i] > values[i + 1]) {
        return i;
      }
    }
    return 'OK';
  };
  return firstError(values);
};

const main = () => {
  const numberOfTestCases = parseInt(readLine());

  for (let i = 0; i < numberOfTestCases; i++) {
    let n = parseInt(readLine());
    let values = readLine().split(' ').map(v => parseInt(v));

    let result = algo(n, values);
    let str = `Case #${i + 1}: ${result} \n`;
    process.stdout.write(str);
  }
};
