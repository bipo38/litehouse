<template>
    <div class="layout--welcome">
        <div class="layout--welcome__banner">
            <div>
                <h1>Litehouse</h1>
                <MiscIconLoader name="light" />
            </div>
            <p>Lighthouse in a simple way</p>
        </div>
        <slot />
    </div>
</template>

<style lang="scss">
@use '~/assets/styles/layouts/welcome.scss'
</style>