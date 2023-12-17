<script setup lang="ts">
definePageMeta({
  layout: 'welcome'
})
</script>

<template>
  <div class="page--login">
    <h2>Sign up</h2>
    <form @submit.prevent="">
      <label>
        Username
        <input class="input--default" type="text" required>
      </label>

      <label>
        Email
        <input class="input--default" type="email" required>
      </label>

      <label>
        Password
        <input class="input--default" type="password" required>
      </label>

      <label>
        Password Confirm
        <input class="input--default" type="password" required>
      </label>

      <button class="button--primary">
        Sign in
      </button>
    </form>
    <div class="page--login__links">
      <nuxt-link to="/signin" class="link--underline link--small">
        Already have account?
      </nuxt-link>
      <nuxt-link to="/" class="link--underline link--small">
        Forgot password?
      </nuxt-link>
    </div>
  </div>
</template>
