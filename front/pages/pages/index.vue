<script lang="ts">

definePageMeta({
  layout: 'default',
  middleware: ['auth']

})
</script>

<template>
  <div class="page page--pages">
    <div class="web">
      <div class="web__title">
        <div class="web__main">
          <div class="web__drop">
            <MiscIconLoader name="caret-down" />
          </div>
          <div class="web__h">
            <h4>Google Website</h4>
          </div>
        </div>
      </div>
      <div class="web__info">
        <div class="web__cron">
          Weekly
        </div>

        <!-- <div class="web__edit">
          <MiscIconLoader name="edit" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/pages/pages.scss';
</style>
