<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: "",
  },
  navigationStep: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    defauly: "",
  },
});
</script>

<template>
  <q-btn no-caps flat class="rounded" dense :icon="icon" :label="label" />
</template>
