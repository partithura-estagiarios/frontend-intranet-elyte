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
const exceptionRoutes = ["/login", "/recover", "/changePassword"];
const showTabHeader = computed(() => {
  return !exceptionRoutes.some((route) =>
    window.location.pathname.includes(route)
  );
});
</script>

<template>
  <TabHeader class="q-mb-xl" v-if="showTabHeader" />
  <RouterView />
</template>
