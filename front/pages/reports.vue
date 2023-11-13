<script setup lang="ts">
definePageMeta({
  middleware: ['auth']

})

const res : Ref<response> = ref(null)

const result = async () => {
  res.value = await useApi().get('/api/user')
}

</script>

<template>
  <div>
    <button @click="result">
      Click
    </button>
    <div v-if="res">
      {{ res.data }}
    </div>
  </div>
</template>
