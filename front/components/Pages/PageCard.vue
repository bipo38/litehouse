<script setup lang="ts">
defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true
  }
})

</script>

<template>
  <div class="page--card">
    <div class="page--card__info">
      <h2 class="h4">
        {{ page.title }}
      </h2>
      <span>{{ page.cron }}</span>
    </div>
    <div class="page--card__edit">
      <NuxtLink :to="`pages/${page.page_id}`" class="button button--primary">
        Edit
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/components/pages/pageCard.scss';
</style>
