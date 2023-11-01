<template>
  <q-card-section
    class="row justify-between items-center q-pl-xl bg-primary color-white"
  >
    <span class="title-size text-bold">{{ title }}</span>
    <q-btn flat round icon="close" @click="$emit('cancel')" />
  </q-card-section>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
defineEmits(["cancel"]);
</script>

<style scoped>
.title-size {
  font-size: 1.5rem;
}
</style>
