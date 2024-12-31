// *******************************************************************
// Find a value deep in an object given a dot separated path.
//
// Returns undefined if a value is not found.
//
// Ex:
// const obj = { a: { deep: { value: 2 } } }
// path = 'a.deep.value'
// const value = getDeepValue(obj, path)
// console.log(value) // 2
// *******************************************************************
const getDeepValue = (obj: object, keysPath: string):string|undefined => {
  function runner(obj: object, keysArr: Array<string>, keysArrIndex = 0) {
    const key = keysArr[keysArrIndex]
    const value = obj[key as keyof typeof obj]
    if (
      keysArr.length === keysArrIndex + 1 ||
      typeof value === undefined
    ) {
      return value
    }
    else {
      return runner(value, keysArr, keysArrIndex + 1)
    }
  }
  const keysArr = keysPath.split('.')
  return runner(obj, keysArr)
}

export { getDeepValue }
