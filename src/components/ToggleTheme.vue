<script setup lang="ts">
const value = ref(false);
</script>

<template>
  <q-toggle
    v-model="value"
    size="xl"
    :icon="themeIcon"
    :color="textColor"
    @click="toggleDark()"
  />
</template>
