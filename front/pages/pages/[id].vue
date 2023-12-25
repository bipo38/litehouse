<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: ['auth']
})

const pageId = useRoute().params.id

const { data } = await useAsyncData(
  'page',
  () => useApi().get(`api/pages/${pageId}`)
)

const page : Page = data.value?.data

</script>

<template>
  <div v-if="data?.ok" class="page page--page">
    <h1>{{ page.title }}</h1>
    <pre>
            {{ page }}
        </pre>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/page.scss';
</style>
