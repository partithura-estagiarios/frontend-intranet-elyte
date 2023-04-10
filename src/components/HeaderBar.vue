<template>
  <q-item class="row items-center backgroundHeader">
    <q-toolbar-section class="q-ma-md row" clickable>
      <q-img src="/public/images/logo.png" width="10rem" />
    </q-toolbar-section>
    <q-toolbar class="justify-center text-white">
      <q-toobar-section class="row">
        <span
          class="titleStyle q-mr-md row text-weight-bolder text-capitalize"
          >{{ title }}</span
        >
        <q-icon size="2rem" class="border" name="house" />
      </q-toobar-section>
    </q-toolbar>
    <q-toobar-section>
      <q-button>
        <q-icon size="3rem" name="cancel" v-if="isLoggedUser" />
        <q-icon size="3rem" name="login" v-else />
      </q-button>
    </q-toobar-section>
  </q-item>
</template>

<script setup lang="ts">
const title = ref(t("titles.textIntranet"));
const isLoggedUser = userStorage.isLoggedIn;

if (isLoggedUser) {
  loga("t");
}
</script>

<style scoped>
.backgroundHeader {
  background-color: #ff0321;
}
.titleStyle {
  font-size: 1.5rem;
  font-family: "Open Sans", sans-serif;
}

.hide {
  visibility: hidden;
}
</style>
