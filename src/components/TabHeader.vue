<template>
  <div class="row justify-between bg-primary q-mb-sm">
    <q-item clickable to="/home" class="q-mx-md q-mt-sm">
      <q-img src="/images/logo.png" class="logo" />
    </q-item>
    <q-tabs no-caps indicator-color="transparent">
      <q-route-tab :label="$t('titles.home')" to="/home" />
      <q-route-tab :label="$t('titles.scheduler')" to="/schedule" />
      <q-btn flat color="white" no-caps :label="$t('admin')" to="/login">
        <q-menu v-if="isLogged">
          <q-list>
            <q-item clickable v-close-popup to="/register">
              <q-item-section class="text-black">
                {{ $t("titles.Login.register") }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-route-tab :label="$t('label.menu')" to="/menu" />
      <q-route-tab :label="$t('label.menuCreate')" to="/menu/create" />
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
const isLogged = localStorage.getItem("token");
</script>

<style scoped>
.logo {
  min-width: 50px;
  max-width: 120px;
  width: 10vw;
}
</style>
