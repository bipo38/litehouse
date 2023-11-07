<script setup lang="ts">
definePageMeta({
    layout: 'welcome'
})
</script>

<template>
    <div class="page--signin">

        <h1>Sign in</h1>
        <form @submit.prevent="">
            <input class="input--default" type="email" required placeholder="Email">
            <input class="input--default" type="password" required placeholder="Password">

            <button class="button--primary">Sign in</button>
        </form>
        <div class="page--signin__links">
            <nuxt-link to="/" class="link--underline link--small">Forgot password?</nuxt-link>

            <nuxt-link to="/signup" class="link--underline link--small">Not registered yet?</nuxt-link>
        </div>
    </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/signin.scss'
</style>