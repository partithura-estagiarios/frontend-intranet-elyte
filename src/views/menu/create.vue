<script setup lang="ts">
onMounted(() => {
  if (!userStorage.isLoggedIn) {
    router.replace("/login");
  }
});
</script>

<template>
  <CreateMenu />
</template>
