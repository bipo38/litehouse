<template>
    <div class="page page--home">

        <div class="page--home__intro">
            <div>
                <h1>LiteHouse </h1>
                <img src="~/assets/svg/light.svg" alt="">
            </div>
            <p>Lighthouse in a simple way</p>
        </div>
        <div class="page--home__login-btns">
            <nuxt-link to="/" class="button button--primary button--big" aria-label="Sign in button">Sign in</nuxt-link>
            <nuxt-link to="/" class="button button--outline button--big" aria-label="Sign up button">Sign up</nuxt-link>
        </div>
    </div>
</template>

<style lang="scss">
@use '../assets/styles/pages/home.scss'
</style>