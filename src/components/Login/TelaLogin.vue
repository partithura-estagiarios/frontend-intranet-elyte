<template>
  <q-img
    class="background-image"
    src="../../assets/loginImages/fundoLogin.png"
    style="height: 100%; max-width: 100%"
    no-transition
    no-spinner
  >
    <div class="full-width column items-center bg-transparent q-mt-xl">
      <q-img
        src="../../assets/loginImages/logoElyte.png"
        :width="sizeLogo"
        no-transition
        no-spinner
      />
      <span class="text-weight-bold q-mb-xl q-mt-sm titulo">{{
        $t("titles.textIntranet")
      }}</span>
      <slot></slot>
    </div>
  </q-img>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";

const $q = useQuasar();

const sizeLogo = computed(() => {
  if ($q.screen.gt.md) {
    return "6rem";
  }
  return "5rem";
});
</script>

<style>
.titulo {
  font-size: 1.5rem;
}
</style>
