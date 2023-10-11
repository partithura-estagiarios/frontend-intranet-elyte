<script setup lang="ts">
const $q = useQuasar();

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
const exceptionRoutes = ["/login", "/recover", "/changePassword", "/emailSent"];
const showTabHeader = computed(() => {
  return !exceptionRoutes.some((route) =>
    window.location.pathname.includes(route)
  );
});
async function getLoggedUser() {
  if (!userStorage.user.getLoggedUser) {
    userStorage.logout();
    $q.notify({
      color: "negative",
      message: "Sessão expirada, por favor faça seu login novamente",
    });
  }
}
getLoggedUser();
</script>

<template>
  <TabHeader v-if="!$route.fullPath.includes('/register')" />
  <RouterView />
</template>
