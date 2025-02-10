const isEmptyString = (s:string):boolean => s.trim() === ''
const isOverLengthString = (s:string, l:number):boolean => s.trim().length > l
const isValidEmail = (s:string):boolean => /^[^@]+@[^@]+\.[^@]+$/.test(s)
const isWordWithHyphens = (s:string):boolean => /^[_a-zA-Z\d-]+$/.test(s)

export {
  isEmptyString,
  isOverLengthString,
  isValidEmail,
  isWordWithHyphens,
}
