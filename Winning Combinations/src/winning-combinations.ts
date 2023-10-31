const payingSymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const wildSymbol = 0;

type WinningCombinationsResult = [number, number[]][];

function call(line: number[]): WinningCombinationsResult {
  let payLineIdx: number[] = [];
  let payLine: number[] = [];
  let winningCombinations: WinningCombinationsResult = [];
  let paySymbol: number = 0;

  for (let i = 0; i < line.length; i++) {
    if (line[i] === wildSymbol) {
      payLineIdx.push(i);
      payLine.push(line[i]);
    } else if (payingSymbols.includes(line[i])) {
      if (payLineIdx.length === 0) {
        payLineIdx.push(i);
        payLine.push(line[i]);
        paySymbol = line[i];
      } else if (line[payLineIdx[payLineIdx.length - 1]] === wildSymbol) {
        if (
          payLine[payLine.length - 2] !== line[i] &&
          payLine.length > 1 &&
          payLine[0] !== 0
        ) {
          payLine.shift();
          payLineIdx.shift();
        }
        payLineIdx.push(i);
        payLine.push(line[i]);
        paySymbol = line[i];
      } else if (
        line[payLineIdx[0]] === line[i] ||
        line[payLineIdx[payLineIdx.length - 1]] === line[i]
      ) {
        payLineIdx.push(i);
        payLine.push(line[i]);
      } else if (payLineIdx.length >= 3) {
        winningCombinations.push([paySymbol, payLineIdx]);

        payLineIdx = [i];
        payLine = [line[i]];
        paySymbol = line[i];
      } else {
        payLineIdx = [i];
        payLine = [line[i]];
        paySymbol = line[i];
      }
    }
  }

  if (payLineIdx.length >= 3) {
    winningCombinations.push([paySymbol, payLineIdx]);
  }

  return winningCombinations;
}

export const WinningCombinations = { call };
