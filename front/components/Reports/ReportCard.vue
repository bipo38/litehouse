<script setup lang="ts">
const props = defineProps({
  report: {
    type: Object as PropType<Report>,
    required: true
  }
})

const analysisArr : Array<Analysis> = JSON.parse(props.report.analysis)
console.log(analysisArr)

const metricsdAverage = computed(() => {
  if (analysisArr.length <= 0) {
    return
  }

  let avg = 0

  analysisArr.forEach((i) => {
    avg += i.stats.mobile!.average
  })

  const res = avg / (analysisArr.length)

  if (res >= 90) {
    return 'green'
  }

  if (res < 90 && res >= 60) {
    return 'yellow'
  }

  return 'red'
})
</script>

<template>
  <NuxtLink :to="`/reports/${report.id}`" class="report">
    <div class="report__date">
      <div>
        {{ useUtils().parseDate(report.created_at) }}
      </div>
      <div>
        <MiscIconLoader name="metrics" :class="`report__date--${metricsdAverage}`" />
      </div>
    </div>
    <div class="report__details">
      <nuxt-link to="/" class="button button--primary">
        Details
      </nuxt-link>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
@use '~/assets/styles/components/report.scss';
</style>
