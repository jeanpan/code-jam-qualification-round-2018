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

const algo = (d, p) => {
  let sIdxs = [];
  for (let i = 0; i < p.length; i++) {
    if (p[i] === 'S') {
      sIdxs.push(i);
    }
  }
  if (sIdxs.length > d) return 'IMPOSSIBLE';
  const total = (s) => {
    let current = 1;
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === 'C') {
        current = current * 2;
      } else if (s[i] === 'S') {
        sum += current;
      }
    }
    return sum;
  };
  let count = 0;
  while (sIdxs[sIdxs.length - 1] >= sIdxs.length && total(p) > d) {
    let last = sIdxs.length - 1;
    while (last > 0 && sIdxs[last] - 1 === sIdxs[last - 1]) {
      last -= 1;
    }
    // swap value
    let tmp = p[sIdxs[last]];
    p[sIdxs[last]] = p[sIdxs[last] - 1];
    p[sIdxs[last] - 1] = tmp;
    // update S index
    sIdxs[last] = sIdxs[last] - 1;
    count += 1;
  }
  return count;
};

const main = () => {
  const numberOfTestCases = parseInt(readLine());

  for (let i = 0; i < numberOfTestCases; i++) {
    let values = readLine().split(' ');
    
    let result = algo(
      parseInt(values[0]), 
      values.splice(1, values.length)[0].split('')
    );
    let str = `Case #${i + 1}: ${result} \n`;
    process.stdout.write(str);
  }
};
