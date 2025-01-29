import {
  isEmpty,
  isOverLength,
  isPossiblyEmail,
  isWordWithHyphens,
} from './string'

interface Options {
  required?: boolean
}

const defaultOptions = {
  required: true,
}

const validateEmail = (
  email:string, options?:Options
):Array<string> => {
  let o = {...defaultOptions, ...options}
  const errors = []
  if (o.required && isEmpty(email)) {
    errors.push('Your email is required.')
  }
  else if (email.length > 0 && !isPossiblyEmail(email)) {
    errors.push('Your email is not valid.')
  }
  return errors
}

const validatePassword = (
  password:string, options?:Options
):Array<string> => {
  let o = {...defaultOptions, ...options}
  const errors = []
  if (o.required && isEmpty(password)) {
    errors.push('Your password is required.')
  }
  return errors
}

const validateUsername = (
  username:string, options?:Options
):Array<string> => {
  let o = {...defaultOptions, ...options}
  const errors = []
  if (o.required && isEmpty(username)) {
    errors.push('Your username is required.')
  }
  else {
    if (isOverLength(username, 16)) {
      errors.push('Your username cannot be more than 16 characters long.')
    }
    if (!isWordWithHyphens(username)) {
      errors.push('Your username can only contain letters, numbers, underscores, and hyphens.')
    }
  }
  return errors
}

export {
  validateEmail,
  validatePassword,
  validateUsername,
}
