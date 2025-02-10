const constrainNumber = (n:number, min:number, max:number):number =>
  Math.min(Math.max(n, min), max)

const isNumberHigherThanBound = (n:number, bound:number):boolean => n > bound
const isNumberLowerThanBound = (n:number, bound:number):boolean => n < bound

const isNumberWithinBounds =
  (n:number, min:number|undefined, max:number|undefined):boolean =>
    (typeof min === 'undefined' || ! isNumberLowerThanBound(n, min)) &&
    (typeof max === 'undefined' || ! isNumberHigherThanBound(n, max))

const isNumeric = (s:string):boolean => {
  // ! isNaN(+s):
  //   Use type coercion to parse the entirely of the string.
  //   parsefloat alone does not do this.
  // ! isNaN(parseFloat(s)):
  //   Ensure strings of whitespace fail.
  return ! isNaN(+s) && ! isNaN(parseFloat(s))
}

const round = (n:number, numDecimals:number):number =>
  +(n.toFixed(numDecimals))

export {
  constrainNumber,
  isNumberHigherThanBound,
  isNumberLowerThanBound,
  isNumberWithinBounds,
  isNumeric,
  round,
}
