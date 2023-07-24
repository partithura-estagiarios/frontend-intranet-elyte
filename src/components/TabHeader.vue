<template>
  <div
    class="full-width row no-wrap justify-between items-center text-white bg-color"
  >
    <div class="q-mx-md q-mt-sm">
      <router-link :to="'/home'">
        <img :src="logo" class="logo" />
      </router-link>
    </div>
    <div>
      <q-tabs no-caps>
        <q-route-tab label="Home" href="/home" />
        <q-route-tab label="Divulgações do RH" href="" />
        <q-route-tab label="Processos" />
      </q-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
const logo = import.meta.env.VITE_LOGO_IMAGE || "/images/logo.png";
const props = defineProps({
  backgroundTabColor: {
    type: String,
    default: () => "var(--q-primary)",
  },
});
</script>

<style scoped>
.logo {
  min-width: 50px;
  max-width: 120px;
  width: 10vw;
}

.bg-color {
  background-color: v-bind(backgroundTabColor);
}
</style>
