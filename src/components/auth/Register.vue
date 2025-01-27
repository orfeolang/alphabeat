<script setup lang="ts">
  import Input from '../widgets/form/Input.vue'
  import Button from '../widgets/form/Button.vue'
  import Checkbox from '../widgets/form/Checkbox.vue'
  import {
    validateEmail,
    validatePassword,
    validatePasswordRepeat,
    validateUsername,
  } from '../../helpers/validator'
  import { reactive } from 'vue'

  interface Fields {
    agree: boolean
    username: string
    password: string
    passwordRepeat: string
    email: string
  }

  interface Errors {
    agree: Array<string>
    username: Array<string>
    password: Array<string>
    passwordRepeat: Array<string>
    email: Array<string>
  }

  const data = reactive<Fields>({
    agree: false,
    username: '',
    password: '',
    passwordRepeat: '',
    email: '',
  })

  const errors = reactive<Errors>({
    agree: [],
    username: [],
    password: [],
    passwordRepeat: [],
    email: [],
  })

  const onInputUsername = (e: { target: { value: string } }) => {
    data.username = e.target.value
    errors.username = validateUsername(data.username)
  }
  const onInputPassword = (e: { target: { value: string } }) => {
    data.password = e.target.value
    errors.password = validatePassword(data.password)
    errors.passwordRepeat = validatePasswordRepeat(data.passwordRepeat, data.password)
  }
  const onInputPasswordRepeat = (e: { target: { value: string } }) => {
    data.passwordRepeat = e.target.value
    errors.passwordRepeat = validatePasswordRepeat(data.passwordRepeat, data.password)
  }
  const onInputEmail = (e: { target: { value: string } }) => {
    data.email = e.target.value
    errors.email = validateEmail(data.email, { required: false })
  }
  const onInputAgree = (e: { target: { checked: boolean } }) => {
    data.agree = e.target.checked
    validateAgree()
  }

  const validateAgree = () => {
    errors.agree = []
    if (!data.agree) {
      errors.agree.push('You must agree to the terms & privacy.')
    }
  }

  // This does not work... why?
  /*
  const hasErrors = () => {
    for (const error in errors) {
      if (error.length > 0) return true
    }
    return false
  }
    */


  // This works..
  const hasErrors = () => {
    if (
      errors.agree.length > 0 ||
      errors.username.length > 0 ||
      errors.password.length > 0 ||
      errors.passwordRepeat.length > 0 ||
      errors.email.length > 0
    ) {
      return true
    }
    return false
  }

  const handleSubmit = async () => {

// 1) Validate all.
    validateAgree()
    errors.username = validateUsername(data.username)
    errors.password = validatePassword(data.password)
    errors.passwordRepeat = validatePasswordRepeat(data.passwordRepeat, data.password)
    errors.email = validateEmail(data.email, { required: false })

// 2) Only continue if no errors.
    if (hasErrors()) {
      console.log('we have errors')
      console.log(errors)
    }
    else {

      try {

        const url = 'http://orfeolang.com/api/auth/register'

        // Somewhere else...
        interface Payload {
          username: string
          password: string
          email?: string
        }

        const payload = <Payload>{
          username: data.username,
          password: data.password,
        }
        if (data.email) {
          payload.email = data.email
        }

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(payload), // is stringified needed here?
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'version=1',
          }
        })
        if (response.ok) {
          const json = await response.json()
          console.log(json)
        }



      }
      catch(e) {
        console.log(e)
      }
    }
  }
</script>

<template>
  <div class="form">
    <div class="head">
      <div class="header">Register For Free</div>
      <div class="tagline">Save & Share Beats!</div>
    </div>
    <div class="body">
      <Input
        class="input"
        id="username"
        :errors=errors.username
        label="Username"
        maxlength="16"
        :notes="['letters numbers underscores hyphens']"
        placeholder="Enter Username"
        type="text"
        v-model=data.username
        @input="onInputUsername"
      />
      <Input
        class="input"
        id="password"
        :errors=errors.password
        label="Password"
        maxlength="64"
        placeholder="Enter Password"
        type="password"
        v-model=data.password
        @input="onInputPassword"
      />
      <Input
        class="input"
        id="passwordRepeat"
        :errors=errors.passwordRepeat
        label="Repeat Password"
        maxlength="64"
        placeholder="Repeat Password"
        type="password"
        v-model=data.passwordRepeat
        @input="onInputPasswordRepeat"
      />
      <Input
        class="input"
        id="email"
        :errors=errors.email
        label="Email"
        :notes="['for lost password retrieval']"
        :optional=true
        placeholder="Enter Email"
        type="email"
        v-model=data.email
        @input="onInputEmail"
      />
    </div>
    <div class="submit">
      <!--<div>By creating an account you agree to our <a href="#">Terms & Privacy Policy</a>.</div>-->
      <Checkbox
        :errors=errors.agree
        label="I agree"
        v-model=data.agree
        @input="onInputAgree"
      />
      <Button
        label="Register"
        @click.prevent="handleSubmit"
      />
    </div>
    <div class="foot">
      <div>Already have an account? <a href="#">Sign in</a></div>
    </div>
  </div>
</template>

<style scoped>
  .head, .submit {
    margin-bottom: 30px;
  }

  .header, .tagline {
    text-align: center;
  }

  .header {
    font-size: 26px;
  }

  .tagline {
    font-size: 18px;
  }



  /* have h1-h6 size in reset.css */
  .form {
    background: #00000022;
    padding: 30px;
    width: 600px;
    border-radius: 4px;
    /* Why does height go all the way down */
  }

  h2 {
    text-align: center;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }


/*
.input {
  margin-bottom: 20px;
}
*/

.hr {
  margin: 20px 0;
}


.foot {
  text-align: center;
}


/*
  h3 {
    text-align: center;
  }
*/
/*
  .required {
    border: 1px solid #ff0000;
    background: #ff000044;
    margin-bottom: 20px;
  }

  .optional {
    border: 1px solid #ff00ff;
    background: #ff00ff44;
    margin-bottom: 20px;
  }
*/





  /* Add padding to containers */
/*
  .body, .footer {
    padding: 16px;
  }




*/




  /* Overwrite default styles of hr */
/*
  hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
  }
*/

  /* Add a blue text color to links */
/*
  a {
    color: dodgerblue;
  }
/*
  /* Set a grey background color and center the text of the "sign in" section */
/*
  .signin {
    background-color: #f1f1f1;
    text-align: center;
  }
*/
</style>
