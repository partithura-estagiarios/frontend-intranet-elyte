<template>
  <div
    class="full-width row no-wrap justify-between items-center text-white bg-primary q-mb-xl"
  >
    <q-item clickable to="/home" class="q-mx-md q-mt-sm">
      <q-img src="/images/logo.png" class="logo" />
    </q-item>
    <q-tabs no-caps indicator-color="transparent">
      <q-route-tab :label="$t('home')" to="/home" />
      <q-btn flat color="white" no-caps :label="$t('admin')" to="/login">
        <q-menu v-if="userStorage.getToken">
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
        </q-menu>
      </q-btn>
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
