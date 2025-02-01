import {
  isEmptyString,
  isOverLengthString,
  isPossiblyEmail,
  isWordWithHyphens,
} from './string'

const validateEmail = (email:string):Array<string> => {
  const errors = []
  if (isEmptyString(email)) {
    errors.push('Your email is required.')
  }
  else if (email.length > 0 && !isPossiblyEmail(email)) {
    errors.push('Your email is not valid.')
  }
  return errors
}

const validatePassword = (password:string):Array<string> => {
  const errors = []
  if (isEmptyString(password)) {
    errors.push('Your password is required.')
  }
  return errors
}

const validateUsername = (username:string, maxLength: number):Array<string> => {
  const errors = []
  if (isEmptyString(username)) {
    errors.push('Your username is required.')
  }
  else {
    if (isOverLengthString(username, maxLength)) {
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
