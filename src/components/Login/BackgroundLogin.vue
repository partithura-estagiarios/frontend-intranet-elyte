<template>
  <q-img
    class="background-image"
    src="../../assets/loginImages/fundoLogin.png"
    height="100%"
    no-transition
    no-spinner
  >
    <div class="full-width column items-center bg-transparent q-mt-xl">
      <q-img
        src="../../assets/loginImages/logoElyte.png"
        :width="size"
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
const size = computed(() => (useQuasar().screen.gt.md ? "6rem" : "5rem"));
</script>

<style>
.titulo {
  font-size: 1.5rem;
}
body {
  overflow: hidden;
}
</style>
