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
</script>

<template>
  <TabHeader class="q-mb-xl" v-if="!$route.fullPath.includes('/login')" />
  <RouterView />
</template>
