<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth']

})

const { data: pages } = await useAsyncData(
  'pages',
  () => useApi().get('api/pages')
)

</script>

<template>
  <div v-if="pages?.ok" class="page page--pages">
    <PagesPageCard v-for="page in pages.data" :key="page.id" :page="page" />
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/pages.scss';
</style>
