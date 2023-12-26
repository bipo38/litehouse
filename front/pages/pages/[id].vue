<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: ['auth']
})

const pageId = useRoute().params.id

const { data } = await useAsyncData(
  'page',
  () => useApi().get(`api/pages/${pageId}`)
)

const page : Page = data.value?.data

</script>

<template>
  <div v-if="data?.ok" class="page page--page">
    <h1>{{ page.title }}</h1>

    <div v-for="(el , i ) in page.urls" :key="i" class="page--page__urls">
      <label>
        Title
        <input class="input--default" type="text" :value="el.title">
      </label>

      <label>
        Url
        <input class="input--default" type="url" pattern="https://.*" :value="el.url">
      </label>
    </div>
    <button class="button--primary">
      Add new
    </button>
    <pre>
            {{ page }}
        </pre>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/page.scss';
</style>
