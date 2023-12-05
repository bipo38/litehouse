<script setup lang="ts">
defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true
  }
})

</script>

<template>
  <div class="page-card">
    <div class="page-card__header">
      <div class="page-card__title">
        <MiscIconLoader name="caret-down" />
        <p>{{ page.title }}</p>
      </div>
      <div class="page-card__edit">
        <NuxtLink :to="`/pages/${page.page_id}`">
          <MiscIconLoader name="edit" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/components/pageCard.scss';
</style>
