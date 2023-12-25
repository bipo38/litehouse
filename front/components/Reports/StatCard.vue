<script setup lang="ts">
const props = defineProps(['score', 'area'])

const status = computed(() => {
  if (props.score >= 90) {
    return 'good'
  }

  if (props.score < 90 || props.score >= 50) {
    return 'regular'
  }

  return 'bad'
})
</script>

<template>
  <div class="stat-card">
    <div class="stat-card__score">
      {{ score }}
    </div>
    <div class="stat-card__area">
      {{ area }}
    </div>
    <div class="stat-card__progress" :class="`stat-card__progress--${status}`">
      <div class="progress" />
      <div class="progress" />
      <div class="progress" />
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/components/reports/statCard.scss';
</style>
