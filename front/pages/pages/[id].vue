<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const pageId = useRoute().params.id

// Network

const { data } = await useAsyncData(
  'page',
  () => useApi().get(`api/pages/${pageId}`)
)

const page: Ref<Page> = ref(data.value?.data)
let snapshotPage : Page = useUtils().deepClone(data.value?.data)
const isEdit = ref(false)

watch(() => page.value, () => {
  isEdit.value = true
}, { deep: true })

const update = async () => {
  const res = await useApi().put(`api/pages/${pageId}`, {
    body: {
      page: page.value
    }
  })

  if (res?.ok) {
    page.value = res.data

    snapshotPage = useUtils().deepClone(res.data)
  }
}

// Title

const undo = () => {
  page.value = useUtils().deepClone(snapshotPage)
}
// Cron

const curentCron = computed(() => {
  const crons = ['month', 'week']

  return crons.filter(val => page.value.cron !== val)
})

// Page

const newPage : Ref<PageUrl> = ref({
  title: '',
  url: ''
})
const canSavePage = ref(false)
const deletePages : Ref<Array<number>> = ref([])

watch(() => newPage.value, () => {
  if (newPage.value.title.length && newPage.value.url.length) {
    canSavePage.value = true
    return
  }

  canSavePage.value = false
}, { deep: true })

const cleanPage = () => {
  newPage.value.title = ''
  newPage.value.url = ''
}

const addPage = () => {
  const title = newPage.value.title
  const url = useUtils().parseUrl(newPage.value.url)

  page.value.urls.unshift({
    title,
    url
  })

  update()
  cleanPage()
}

const removePages = () => {
  page.value.urls = page.value.urls.filter((_, i) => !deletePages.value.includes(i))

  update()

  deletePages.value = []
}

</script>

<template>
  <div v-if="data?.ok" class="page page--page">
    <button class="page--page__back button--secondary" @click="useRouter().back()">
      Back
    </button>

    <div class="page--page__btn-actions">
      <button :class="isEdit ? 'button--primary' : 'button--disable' " :disabled="!isEdit" @click="update">
        Save
      </button>
      <button class="button--secondary" @click="undo">
        Cancel
      </button>
    </div>

    <div class="page--page__cron">
      <span class="subtitle">Cron</span>
      <select v-model="page.cron" name="cron">
        <option :value="page.cron" selected>
          {{ page.cron }}
        </option>

        <option v-for="(cron , i) in curentCron" :key="i" :value="cron">
          {{ cron }}
        </option>
      </select>
    </div>

    <div class="page--page__title">
      <span class="subtitle">Title</span>
      <input
        id="title"
        v-model="page.title"
        class="input--default base-title"
        type="text"
        minlength="1"
        maxlength="30"
      >
    </div>

    <div class="page--page__add-url">
      <div>
        <span class="subtitle">New Page</span>
        <div class="section">
          <label>
            Title
            <input v-model="newPage.title" class="input--default" type="text" required>
          </label>

          <label>
            Url
            <input v-model="newPage.url" class="input--default" type="url" required>
          </label>
        </div>
        <div class="page--page__url-actions">
          <button :class="canSavePage ? 'button--primary' : 'button--disable'" :disabled="!canSavePage" @click="addPage">
            Add
          </button>
          <button class="button--secondary" @click="cleanPage">
            Clean
          </button>
        </div>
      </div>
    </div>

    <div class="page--page__urls">
      <span class="subtitle">URLs</span>
      <div v-if="page.urls.length > 0">
        <div class="page--page__urls-edit">
          <button class="button--secondary" @click="removePages">
            Delete
          </button>
        </div>
        <div class="page--page__section-urls">
          <div v-for="(url ,i) in page.urls" :key="i" class="section">
            <input v-model="deletePages" :value="i" type="checkbox">
            <label>
              Title
              <input v-model="url.title" class="input--default" type="text">
            </label>

            <label>
              Url
              <input v-model="url.url" class="input--default" type="url">
            </label>
          </div>
        </div>
      </div>
      <div v-else class="page--page__empty-urls">
        Any urls created
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/page.scss';
</style>
