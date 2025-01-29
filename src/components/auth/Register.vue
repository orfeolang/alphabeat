<script setup lang="ts">
  import { ref } from 'vue'
  import Modal from '../widgets/Modal.vue'
  import Input from '../widgets/form/Input.vue'
  import Button from '../widgets/form/Button.vue'
  import Checkbox from '../widgets/form/Checkbox.vue'
  import {
    validateEmail,
    validatePassword,
    validateUsername,
  } from '../../helpers/validator'
  import { reactive } from 'vue'

  import PrivacyPolicy from '../static/en/PrivacyPolicy.vue'
  import TermsOfUse from '../static/en/TermsOfUse.vue'

  interface Fields {
    agree:    boolean
    email:    string
    password: string
    username: string
  }

  interface Errors {
    agree:    Array<string>
    email:    Array<string>
    password: Array<string>
    username: Array<string>
  }

  const data = reactive<Fields>({
    agree:    false,
    email:    '',
    password: '',
    username: '',
  })

  const errors = reactive<Errors>({
    agree:    [],
    email:    [],
    password: [],
    username: [],
  })

  const onInputAgree = (e: { target: { checked: boolean } }) => {
    data.agree = e.target.checked
    validateAgree()
  }
  const onInputEmail = (e: { target: { value: string } }) => {
    data.email = e.target.value
    errors.email = validateEmail(data.email)
  }
  const onInputPassword = (e: { target: { value: string } }) => {
    data.password = e.target.value
    errors.password = validatePassword(data.password)
  }
  const onInputUsername = (e: { target: { value: string } }) => {
    data.username = e.target.value
    errors.username = validateUsername(data.username)
  }

  const validateAgree = () => {
    errors.agree = []
    if (!data.agree) {
      errors.agree.push('You must agree to the Terms of Use & Privacy Policy.')
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
      errors.email.length > 0 ||
      errors.password.length > 0 ||
      errors.username.length > 0
    ) {
      return true
    }
    return false
  }

  const handleSubmit = async () => {

// 1) Validate all.
    validateAgree()
    errors.email    = validateEmail(data.email)
    errors.password = validatePassword(data.password)
    errors.username = validateUsername(data.username)

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
          email: string
          password: string
          username: string
        }

        const payload = <Payload>{
          email:    data.email,
          password: data.password,
          username: data.username,
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

  const modalActive = ref(false)

  const toggleModal = () => {
    modalActive.value = ! modalActive.value
  }
</script>

<template>
  <div class="form">
    <div class="head">
      <div class="header">Register For Free</div>
      <div class="tagline">Create, Edit, Save & Share Beats!</div>
    </div>
    <div class="body">
      <div class="inputs">
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
          id="email"
          :errors=errors.email
          label="Email"
          placeholder="Enter Email"
          type="email"
          v-model=data.email
          @input="onInputEmail"
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
      </div>
      <div class="agree">
        <div class="note">
          By creating an account you agree to our
          <a href="#" @click=toggleModal>Terms of Use & Privacy Policy</a>.
        </div>
        <Checkbox
          class="checkbox"
          :errors=errors.agree
          label="I agree"
          v-model=data.agree
          @input="onInputAgree"
        />
      </div>
      <div class="submit">
        <Button
          label="Register"
          @click.prevent="handleSubmit"
        />
      </div>
    </div>
    <div class="foot">
      <div>Already have an account? <RouterLink to="/sign-in">Sign-in</RouterLink></div>
    </div>
  </div>
  <Modal @close=toggleModal :isOpen=modalActive>
    <div class="modal-content">
      <TermsOfUse />
      <PrivacyPolicy />
      <Checkbox
          class="checkbox"
          :errors=errors.agree
          label="I agree"
          v-model=data.agree
          @input="onInputAgree"
        />
    </div>
  </Modal>
</template>



<!--
/* https://hopem.com/wp-content/uploads/2023/11/Quebec-Privacy-Policy-Draft.pdf */
-->

<style scoped>

.modal-content {
  overflow-y: scroll;
}

  /* have h1-h6 size in reset.css */
  .form {
    background: #00000022;
    padding: 30px;
    width: 600px;
    /* border-radius: 4px; */
    /* Why does height go all the way down */
    /*height: 700px;*/
  }

  .head, .body {
    margin-bottom: 30px;
  }

  .foot {
    text-align: center;
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





.input {
  margin-bottom: 20px;
}

.agree {
  margin-bottom: 30px;
}







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
