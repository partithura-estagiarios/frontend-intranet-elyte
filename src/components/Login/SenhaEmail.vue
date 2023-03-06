<template>
  <div :class="textSize" class="q-mt-lg q-mb-lg">
    <p class="text-weight-bold">{{ $t("login.linkHasSent") }}</p>
    <p>{{ $t("login.spamBox") }}</p>
  </div>

  <q-btn
    :label="$t('login.textLogin')"
    rounded
    style="background: #fff; color: black; width: 20rem"
    class="q-mt-md btn-enviar q-mb-xs"
    :size="sizeBtn"
    to="/login"
  />
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";

const $q = useQuasar();

const textSize = computed(() => {
  if ($q.screen.gt.md) {
    return "text-h5";
  }
  return "text-h7";
});

const sizeBtn = computed(() => {
  if ($q.screen.gt.md) {
    return "lg";
  }
  return "md";
});
</script>

<style scoped>
.btn-enviar {
  box-shadow: 0px 10px 40px -12px #fff;
}
.btn-enviar:hover {
  box-shadow: 0px 10px 40px -12px #ff0000;
}
</style>
