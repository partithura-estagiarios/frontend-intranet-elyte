<script setup lang="ts">
const title = ref("INTRANET ELYTE");
</script>

<template>
  <q-item class="row items-center backgroundHeader">
    <q-toolbar-section class="q-ma-md row" clickable>
      <q-img src="/public/images/logo.png" width="10rem" />
    </q-toolbar-section>
    <q-toolbar class="justify-center text-white">
      <q-toobar-section class="row">
        <span class="titleStyle q-mr-md row text-weight-bolder">{{
          title
        }}</span>
        <q-icon size="2rem" class="border" name="house" />
      </q-toobar-section>
    </q-toolbar>
    <q-toobar-section>
      <q-icon size="3rem" name="settings_applications" />
    </q-toobar-section>
  </q-item>
</template>

<style scoped>
.backgroundHeader {
  background-color: #ff0321;
}
.titleStyle {
  font-size: 1.5rem;
  font-family: "Open Sans", sans-serif;
}
</style>
