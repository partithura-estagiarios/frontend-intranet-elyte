<template>
  <MainLayout />
</template>

<script lang="ts" setup>
const teste = userStorage.getUser;
if (teste.username == "") {
  loga("u");
}
</script>

<style scoped>
.headerBar {
  background-color: brown;
}
</style>
