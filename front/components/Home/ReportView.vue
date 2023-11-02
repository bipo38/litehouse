<!-- <script setup lang="ts">
defineProps({
    report: {
        type: Object,
        required: true
    }
})
</script> -->

<template>
    <nuxt-link to="/" class="report-view">
        <div class="report-view__info">
            <div>Report 12/12/2023</div>
        </div>
        <div>
            <button class="button--primary">Details</button>
        </div>
    </nuxt-link>
</template>

<style lang="scss">
@use "~/assets/styles/components/home/reportView.scss";
</style>
