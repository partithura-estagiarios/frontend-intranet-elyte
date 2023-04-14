<script setup lang="ts">
useHead({
  title: "titulo",
  meta: [
    { name: "description", content: "Opinionated Vite Starter Template" },
    {
      name: "theme-color",
      content: computed(() => (isDark.value ? "#00aba9" : "#ffffff")),
    },
  ],
});

const currentRouteValue = ref(router.currentRoute.value.fullPath);

loga(currentRouteValue.value);
</script>

<template>
  <HeaderBar class="q-mb-xl" />
  <RouterView />
</template>
