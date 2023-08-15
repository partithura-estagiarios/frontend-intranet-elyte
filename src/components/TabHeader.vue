<template>
  <div
    class="full-width row no-wrap justify-between items-center text-white bg-primary"
  >
    <q-item clickable to="/home" class="q-mx-md q-mt-sm">
      <q-img src="/images/logo.png" class="logo" />
    </q-item>
    <q-tabs no-caps indicator-color="transparent">
      <q-route-tab :label="$t('home')" to="/home" />
      <q-route-tab :label="$t('admin')" to="/login" />
      <q-route-tab label="Agendar Sala" to="/schedule" />
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
