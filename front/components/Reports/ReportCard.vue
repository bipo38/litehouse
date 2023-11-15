<script setup lang="ts">
const props = defineProps({
  report: {
    type: Object,
    required: true
  }
})

const analysis = JSON.parse(props.report.analysis)
console.log(analysis);

const metricsdAverage = computed(() => {
  const res = 90

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
  <div class="report">
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
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/components/report.scss';
</style>
