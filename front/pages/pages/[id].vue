<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: ['auth']
})

const pageId = useRoute().params.id
const isEdited = ref(false)

const { data } = await useAsyncData(
  'page',
  () => useApi().get(`api/pages/${pageId}`)
)
let page : Page = data.value?.data

watch(
  () => page,
  () => {
    isEdited.value = true
  },
  { deep: true }
)

const update = async () => {
  const res = await useApi().put(`/api/pages/${pageId}`, {
    body: {
      title: page.title,
      urls: page.urls,
      cron: page.cron
    }
  })

  if (res?.ok) {
    page = res?.data
  }
}

</script>

<template>
  <div v-if="data?.ok" class="page page--page">
    <h1>
      <input v-model="page.title" class="input--default" type="text">
    </h1>

    <div class="page--page__cron">
      <select v-model="page.cron" name="cron">
        <option value="week">
          Week
        </option>
        <option value="month">
          Month
        </option>
      </select>

      <button class="button--primary" :disabled="!isEdited" @click="update">
        Save
      </button>
    </div>

    <div v-for="(el , i ) in page.urls" :key="i" class="page--page__urls">
      <label>
        Title
        <input v-model="el.title" class="input--default" type="text">
      </label>
      <label>
        Url
        <input v-model="el.url" class="input--default" type="url" pattern="https://.*">
      </label>
    </div>

    <pre>
      {{ page }}
    </pre>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/page.scss';
</style>
