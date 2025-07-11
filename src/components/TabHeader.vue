<script setup lang="ts">
const enableDrop = ref(false);
watchPostEffect(() => {
  if (userStorage.getToken) {
    enableDrop.value = !enableDrop.value;
    return;
  }
  enableDrop.value = !enableDrop.value;
});
</script>
<template>
  <div
    class="full-width row no-wrap justify-between items-center text-white bg-primary"
  >
    <q-item clickable to="/home" class="q-mx-md q-mt-sm">
      <q-img src="/images/logo.png" class="logo" />
    </q-item>

    <q-tabs no-caps indicator-color="transparent">
      <q-route-tab :label="$t('home')" to="/home" />
      <q-route-tab :label="$t('titles.Login.register')" to="/register" />
      <q-btn-dropdown
        flat
        color="white"
        :disable="!enableDrop"
        dropdown-icon="settings"
        content-style="min-width: 250px"
      >
        <q-list>
          <q-item @click="userStorage.logout()" v-close-popup to="/login">
            <q-item-section class="text-black text-no-wrap">{{
              $t("titles.Login.logOutOfAccount")
            }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-tabs>
  </div>
</template>

<style scoped>
.logo {
  min-width: 50px;
  max-width: 120px;
  width: 10vw;
}
</style>
