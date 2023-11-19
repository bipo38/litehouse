<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth']

})

const reportId = useRoute().params.id

const { data } = await useAsyncData(
  'reports',
  () => useApi().get(`api/reports/${reportId}`)
)
// const analysisArr = JSON.parse(data.value)

</script>

<template>
  <div class="page page--report">
    <pre>{{ data }}</pre>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/report.scss';
</style>
