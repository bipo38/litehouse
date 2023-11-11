<script setup lang="ts">
definePageMeta({
  layout: 'welcome'
})
</script>

<template>
  <div class="page--login">
    <h2>Sign up</h2>
    <form @submit.prevent="">
      <input class="input--default" type="text" placeholder="Username" required>
      <input class="input--default" type="email" placeholder="Email" required>
      <input class="input--default" type="password" placeholder="Password" required>
      <input class="input--default" type="password" placeholder="Password Confirm" required>

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
