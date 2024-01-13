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
  <div v-if="reports?.ok" class="page page--reports">
    <div v-for="(report , i) in reports.data" :key="i" class="page--reports__reports">
      <h2 class="h4">
        Created {{ useUtils().parseDate(report.date) }}
      </h2>
      <div class="page--reports__cards">
        <ReportsReportCard v-for="finalReport in report.reports" :key="finalReport.report_id" :report="finalReport" />
      </div>
    </div>

    <div v-if="!reports?.ok">
      Reports not found :(
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/reports.scss';
</style>
