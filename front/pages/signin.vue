<script setup lang="ts">
definePageMeta({
  layout: 'welcome',
  middleware: ['guest']
})

const email = ref('')
const password = ref('')

const dataRes : Ref<response> = ref(null)

const login = async () => {
  dataRes.value = await useApi().post('/api/login', {
    body: {
      email: email.value,
      password: password.value
    }
  })

  if (dataRes.value?.ok) {
    navigateTo('/reports')
  }
}

</script>

<template>
  <div class="page--login">
    <h2>Sign in</h2>
    <form @submit.prevent="login">
      <label>
        Email
        <input v-model="email" class="input--default" type="email" required>
      </label>

      <label>
        <div>
          Password
          <nuxt-link to="/" class="link--underline link--small">
            Forgot password?
          </nuxt-link>
        </div>
        <input v-model="password" class="input--default" type="password" required>

      </label>

      <div v-if="dataRes && !dataRes.ok" class="page--login__invalid">
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
    </div>
  </div>
</template>
