<script setup lang="ts">
definePageMeta({
    layout: 'welcome'
})
</script>

<template>
    <div class="page--login">

        <h2>Sign in</h2>
        <form @submit.prevent="">
            <input class="input--default" type="email" required placeholder="Email">
            <input class="input--default" type="password" required placeholder="Password">

            <button class="button--primary">Sign in</button>
        </form>
        <div class="page--login__links">
            <nuxt-link to="/signup" class="link--underline link--small">Not registered yet?</nuxt-link>
            <nuxt-link to="/" class="link--underline link--small">Forgot password?</nuxt-link>
        </div>
    </div>
</template>