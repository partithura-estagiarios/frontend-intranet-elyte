<script setup lang="ts">
const prop = defineProps({
  openModal: {
    type: Function,
    default: () => {},
  },
});
</script>

<template>
  <q-btn flat size="sm" icon="edit" @click="prop.openModal" />
</template>
