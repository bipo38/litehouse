<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: ['auth']

})

const reportId = useRoute().params.id

const { data: report } = await useAsyncData(
  'report',
  () => useApi().get(`api/reports/${reportId}`)
)

</script>

<template>
  <div v-if="report?.ok" class="page page--report">
    <h1>{{ report.data.title }}</h1>
    <div v-for="(analysis , i) in report.data.analysis" :key="i">
      <a :href="analysis.url" class="page--report__info" :title="analysis.url">
        <h2 class="h3 ">
          {{ analysis.name }}
        </h2>
        <MiscIconLoader name="link" />
      </a>
      <div class="page--report__stats">
        <ReportsStatsSection :stats="analysis.stats" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/report.scss';
</style>
