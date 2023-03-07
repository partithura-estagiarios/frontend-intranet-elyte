<template>
  <div :class="size.text" class="q-mt-lg q-mb-lg">
    <p class="text-weight-bold">{{ $t("titles.Login.linkHasSent") }}</p>
    <p>{{ $t("titles.Login.verifySpam") }}</p>
  </div>

  <q-btn
    :label="$t('titles.Login.textLoginForm')"
    rounded
    style="background: #fff; color: black; width: 20rem"
    class="q-mt-md btn-enviar q-mb-xs"
    :size="size.btn"
    to="/login"
  />
</template>

<script setup lang="ts">
const size = computed(() => {
  if (useQuasar().screen.gt.md) {
    return {
      text: "text-h5",
      btn: "lg",
    };
  }
  return {
    text: "text-h7",
    btn: "md",
  };
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
