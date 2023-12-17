<script setup lang="ts">

const currentPath = computed(() => {
  const route = useRoute().matched

  return route[0].name
})
</script>

<template>
  <header v-if="currentPath" class="header">
    <nav>
      <ul>
        <li>
          <nuxt-link to="/reports">
            Reports
          </nuxt-link>
          <MiscIconLoader v-if="currentPath.includes('reports')" name="line" />
        </li>
        <li>
          <nuxt-link to="/pages">
            Pages
          </nuxt-link>
          <MiscIconLoader v-if="currentPath.includes('pages')" name="line" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
@use '~/assets/styles/components/header.scss';
</style>
