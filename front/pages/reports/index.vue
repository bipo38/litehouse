<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth']

})

const { data: reports } = await useAsyncData(
  'reports',
  () => useApi().get('api/reports')
)

</script>

<template>
  <div class="page page--reports">
    <!-- <pre>
      {{ data?.data[0].analysis[0] }}
    </pre> -->
    <div v-if="reports?.ok" class="page--reports__reports">
      <ReportsReportCard v-for="report in reports.data" :key="report.report_id" :report="report" />
    </div>
    <div v-else>
      Reports not found :(
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/reports.scss';
</style>
