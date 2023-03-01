<template>
  <div class="text-h5 q-mt-lg q-mb-lg">
    <p class="text-weight-bold">{{ $t("login.linkHasSent") }}</p>
    <p>{{ $t("login.spamBox") }}</p>
  </div>

  <q-btn
    :label="$t('login.textLogin')"
    rounded
    style="background: #fff; color: black; width: 20rem"
    class="q-mt-md btn-enviar q-mb-xs"
    size="lg"
    text-color="red"
    to="/login"
  />
</template>

<style scoped>
.btn-enviar:hover {
  box-shadow: 0 8px 8px -4px red;
  color: red !important;
}
</style>
