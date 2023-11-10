<script setup lang="ts">
definePageMeta({
    layout: 'welcome'
})

const email = ref('')
const password = ref('')

const data = ref('')

const login = async () => {
    const res = await useApi().post("/api/login", {
        body: {
            email: email.value,
            password: password.value,
        },
    })

    data.value = res.data
}

</script>

<template>
    <div class="page--login">

        <h2>Sign in</h2>
        <form @submit.prevent="login">
            <input class="input--default" type="email" required placeholder="Email" v-model="email">
            <input class="input--default" type="password" required placeholder="Password" v-model="password">

            <button class="button--primary">Sign in</button>
        </form>
        <div class="page--login__links">
            <nuxt-link to="/signup" class="link--underline link--small">Not registered yet?</nuxt-link>
            <nuxt-link to="/" class="link--underline link--small">Forgot password?</nuxt-link>
        </div>

        {{ data }}
    </div>
</template>