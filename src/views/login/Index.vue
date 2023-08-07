<script setup lang="ts">
onMounted(() => {
  if (userStorage.isLoggedIn) {
    router.push("home");
  }
});
</script>

<template>
  <BackgroundLogin>
    <LoginForm />
  </BackgroundLogin>
</template>
