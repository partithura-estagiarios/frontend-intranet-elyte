<script setup lang="ts">
onMounted(() => {
  if (!userStorage.isLoggedIn) {
    router.push({ path: "/login" });
  }
});
</script>

<template>
  <CreateMenu />
</template>
