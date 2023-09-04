<script setup lang="ts">
defineProps({
  userId: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <BackgroundLogin>
    <ChangePassword />
  </BackgroundLogin>
</template>
