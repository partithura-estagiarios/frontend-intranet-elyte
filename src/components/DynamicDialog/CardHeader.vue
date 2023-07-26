<template>
  <q-card-section class="row justify-between items-center bg-primary">
    <span class="text-h6">{{ title }}</span>
    <q-btn flat round icon="close" @click="$emit('cancel')" />
  </q-card-section>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
defineEmits(["cancel"]);
</script>
