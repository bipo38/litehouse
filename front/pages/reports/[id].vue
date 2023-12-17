<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth']

})

const reportId = useRoute().params.id

const { data: report } = await useAsyncData(
  'report',
  () => useApi().get(`api/reports/${reportId}`)
)

</script>

<template>
  <div class="page page--report">
    <pre>{{ report }}</pre>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/report.scss';
</style>
