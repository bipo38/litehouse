<script setup lang="ts">
defineProps({
  stats: {
    type: Array as PropType<Array<Stats>>,
    required: true
  }
})

</script>

<template>
  <div v-for="(stat , i) in stats" :key="i" class="stats-section">
    <div class="stats-section__factor">
      {{ stat.formFactor }}
    </div>
    <div class="stats-section__stats">
      <ReportsStatCard :score="stat.performance" area="Performance" />
      <ReportsStatCard :score="stat.bestPractices" area="Best Practices" />
      <ReportsStatCard :score="stat.accessibility" area="Accessibility" />
      <ReportsStatCard :score="stat.seo" area="Seo" />
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/components/reports/statsSection.scss';
</style>
