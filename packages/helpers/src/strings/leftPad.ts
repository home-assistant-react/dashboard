export const leftPad = (num: number, digits = 2) => {
  let paddedNum = "" + num;
  for (let i = 1; i < digits; i++) {
    paddedNum = parseInt(paddedNum) < 10 ** i ? `0${paddedNum}` : paddedNum;
  }
  return paddedNum;
};
