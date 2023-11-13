<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth']

})

const { data } = await useAsyncData(
  'reports',
  () => useApi().get('api/reports')
)

</script>

<template>
  <div class="page page--reports">
    <div>
      {{ data?.data.lenght ? data : 'No reports found :(' }}
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/reports.scss';
</style>
