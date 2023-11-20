<script setup lang="ts">
const props = defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true
  }
})

const urls: Array<PageUrl> = JSON.parse(props.page.urls)
</script>

<template>
  <div class="page-card">
    <div class="page-card__header">
      <p>{{ page.title }}</p>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/components/pageCard.scss';
</style>
