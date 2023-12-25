<script setup lang="ts">
const props = defineProps({
  report: {
    type: Object as PropType<Report>,
    required: true
  }
})

const average: Ref<number> = ref(0)

const metricsdAverage = computed(() => {
  const analysisArr : Array<Analysis> = props.report.analysis
  if (analysisArr.length <= 0) {
    return
  }

  let avg = 0

  analysisArr.forEach((item) => {
    avg += item?.stats.map(stat => stat.average).reduce((acc, val) => acc + val, 0)
  })

  avg = avg / (analysisArr.length * analysisArr[0].stats.length)

  average.value = avg

  if (avg >= 90) {
    return 'green'
  }

  if (avg < 90 && avg >= 60) {
    return 'yellow'
  }

  return 'red'
})
</script>

<template>
  <NuxtLink :to="`/reports/${report.report_id}`" class="report-card">
    <div class="report-card__date">
      <div>
        {{ report.title }}
      </div>
      <div>
        <MiscIconLoader name="metrics" :class="`report-card__date--${metricsdAverage}`" :title="average" />
      </div>
    </div>
    <div class="report-card__details">
      <span role="link" to="/" class="button button--primary">
        Details
      </span>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
@use '~/assets/styles/components/reports/reportCard.scss';
</style>
