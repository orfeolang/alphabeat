import {
  isEmpty,
  isOverLength,
  isPossiblyEmail,
  isWordWithHyphens,
} from './string'

const validateEmail = (email:string):Array<string> => {
  const errors = []
  if (isEmpty(email)) {
    errors.push('Your email is required.')
  }
  else if (email.length > 0 && !isPossiblyEmail(email)) {
    errors.push('Your email is not valid.')
  }
  return errors
}

const validatePassword = (password:string):Array<string> => {
  const errors = []
  if (isEmpty(password)) {
    errors.push('Your password is required.')
  }
  return errors
}

const validateUsername = (username:string, maxLength: number):Array<string> => {
  const errors = []
  if (isEmpty(username)) {
    errors.push('Your username is required.')
  }
  else {
    if (isOverLength(username, maxLength)) {
      errors.push(`Your username cannot be more than ${maxLength} characters long.`)
    }
    if ( ! isWordWithHyphens(username)) {
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
