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
      <q-menu v-if="isLogged">
        <q-list>
          <q-item clickable v-close-popup to="/register">
            <q-item-section class="text-black">
              {{ $t("titles.Login.register") }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <q-route-tab :label="$t('home')" to="/home" />
      <q-route-tab :label="$t('titles.scheduler')" to="/schedule" />
      <q-route-tab :label="$t('label.menu')" to="/menu" />
      <q-route-tab :label="$t('label.menuCreate')" to="/menu/create" />
      <q-route-tab
        flat
        color="white"
        no-caps
        :label="$t('admin')"
        to="/login"
        :disable="enableDrop"
      >
      </q-route-tab>
      <q-btn-dropdown
        flat
        color="white"
        :disable="!enableDrop"
        dropdown-icon="settings"
      >
        <q-list>
          <q-item clickable v-close-popup to="/register">
            <q-item-section class="text-black">{{
              $t("titles.Login.register")
            }}</q-item-section>
          </q-item>
          <q-item @click="userStorage.logout()" v-close-popup to="/login">
            <q-item-section class="text-black">{{
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
