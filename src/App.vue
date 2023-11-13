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
const exceptionRoutes = ["/login", "/recover", "/changePassword", "/emailSent"];
const showTabHeader = computed(() => {
  return !exceptionRoutes.some((route) =>
    window.location.pathname.includes(route)
  );
});
async function userIsLogged() {
  if (!(await userStorage.getLoggedUser)) {
    negativeNotify(t("notifications.fail.timeExpired"));
    userStorage.logout();
  }
}
userIsLogged();
</script>

<template>
  <TabHeader />
  <RouterView />
</template>
