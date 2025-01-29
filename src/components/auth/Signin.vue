<script setup lang="ts">
  import Input from '../widgets/form/Input.vue'
  import Button from '../widgets/form/Button.vue'
  import { reactive } from 'vue'

  interface Fields {
    usernameOrEmail: string
    password: string
  }

  interface Errors {
    usernameOrEmail: Array<string>
    password: Array<string>
  }

  const data = reactive<Fields>({
    usernameOrEmail: '',
    password: '',
  })

  const errors = reactive<Errors>({
    usernameOrEmail: [],
    password: [],
  })

  const handleSubmit = () => {
  }
</script>

<template>
  <div class="form">
    <div class="head">
      <div class="header">Sign in</div>
    </div>
    <div class="body">
      <Input
        id="username"
        :errors=errors.usernameOrEmail
        label="Username or Email"
        placeholder="Enter Username or Email"
        type="text"
        v-model=data.usernameOrEmail
        @input="onInputUsernameOrEmail"
      />
      <Input
        id="password"
        :errors=errors.password
        label="Password"
        placeholder="Enter Password"
        type="password"
        v-model=data.password
        @input="onInputPassword"
      />
      <Button
        label="Sign in"
        @click.prevent="handleSubmit"
      />
    </div>
    <div class="footer signin">
      <p>Forgot password? <a href="#">Password Retrieval</a>.</p>
    </div>
  </div>
</template>

<style scoped>
  .head, .submit {
    margin-bottom: 30px;
  }

  .header {
    text-align: center;
    font-size: 26px;
  }

  /* have h1-h6 size in reset.css */
  .form {
    background: #00000022;
    padding: 30px;
    width: 600px;
    border-radius: 4px;
    /* Why does height go all the way down */
  }

  h3 {
    text-align: center;
  }

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



  form {
    width: 500px;
    background: #313131;
  }


  /* Add padding to containers */
  .body, .footer {
    padding: 16px;
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items:last baseline;
  }

  label .note {
    font-size: 12px;
  }



  /* Full-width input fields */
  input[type=text], input[type=password] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
    border: 5px solid #ff00ff;
  }

  input[type=text]:focus, input[type=password]:focus {
    /* background-color: #ddd; */
    outline: none;
  }

  input.nonvalid {
    border: 5px solid #cc0000;
  }



  /* Overwrite default styles of hr */
  hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
  }

  /* Set a style for the submit/register button */
  .button-register {
    background-color: #04AA6D;
    color: white;
    padding: 15px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
  }

  .button-register:hover {
    opacity:1;
    /* transition */
  }

  /* Add a blue text color to links */
  a {
    color: dodgerblue;
  }

  /* Set a grey background color and center the text of the "sign in" section */
  .signin {
    background-color: #f1f1f1;
    text-align: center;
  }
</style>
