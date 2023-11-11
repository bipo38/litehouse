<script setup lang="ts">
definePageMeta({
  layout: 'welcome'
})

const email = ref('')
const password = ref('')

const dataRes: Ref<response | null> = ref(null)

const login = async () => {
  dataRes.value = await useApi().post('/api/login', {
    body: {
      email: email.value,
      password: password.value
    }
  })
}

</script>

<template>
  <div class="page--login">
    <h2>Sign in</h2>
    <form @submit.prevent="login">
      <input v-model="email" class="input--default" type="email" required placeholder="Email">
      <input v-model="password" class="input--default" type="password" required placeholder="Password">

      <div v-if="dataRes?.ok">
        {{ dataRes.data }}
      </div>

      <button class="button--primary">
        Sign in
      </button>
    </form>
    <div class="page--login__links">
      <nuxt-link to="/signup" class="link--underline link--small">
        Not registered yet?
      </nuxt-link>
      <nuxt-link to="/" class="link--underline link--small">
        Forgot password?
      </nuxt-link>
    </div>
  </div>
</template>
