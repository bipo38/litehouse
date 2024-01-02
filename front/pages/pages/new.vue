<script setup lang="ts">
const page : Ref<Page> = ref({
  title: '',
  cron: 'month',
  urls: []
})

const url: Ref<PageUrl> = ref({
  title: '',
  url: ''
})
const canSavePage = ref(false)
watch(() => url.value, () => {
  if (url.value.title.length && url.value.url.length) {
    canSavePage.value = true
    return
  }

  canSavePage.value = false
}, { deep: true })

const addPage = () => {
  const parsedUrl = useUtils().parseUrl(url.value.url)
  page.value.urls.unshift({
    title: url.value.title,
    url: parsedUrl
  })

  url.value = {
    title: '',
    url: ''
  }
}

const savePage = async () => {
  const res = await useApi().post('api/pages', {
    body: {
      page: page.value
    }
  })

  if (res?.ok) {
    await navigateTo('/pages')
  }
}

</script>

<template>
  <div class="page--new-page">
    <button class="button--secondary" @click="useRouter().back">
      Back
    </button>

    <form @submit.prevent="savePage">
      <button type="submit" class="button--secondary">
        Save
      </button>

      <label>
        <span>Title</span>
        <input v-model="page.title" type="text" class="input--default base-title" required>
      </label>

      <label>
        <span>Cron</span>
        <select v-model="page.cron" name="cron" required>
          <option value="month" selected>
            Month
          </option>
          <option value="week">
            Week
          </option>
        </select>
      </label>
    </form>

    <div class="page--new-page__urls">
      <label>
        Title
        <input v-model="url.title" class="input--default" type="text" required minlength="1">
      </label>
      <label>
        Url
        <input v-model="url.url" class="input--default" type="url" required>
      </label>
      <div>
        <button :class="canSavePage ? 'button--primary' : 'button--disable'" :disabled="!canSavePage" @click="addPage">
          Add
        </button>
      </div>
    </div>

    <div class="page--new-page__add-urls">
      <span>Urls</span>
      <div v-if="page.urls.length > 0">
        <div v-for="(el,i) in page.urls" :key="i">
          <label>
            Title
            <input v-model="el.title" class="input--default" type="text">
          </label>
          <label>
            Url
            <input v-model="el.url" class="input--default" type="url">
          </label>
        </div>
      </div>
      <div v-else>
        Any pages
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/new.scss';
</style>
