<template>
  <q-card>
    <CardHeader v-bind="$props" @cancel="() => $emit('cancel')" />
    <q-card-section>
      <slot />
    </q-card-section>
    <CardFooter @cancel="() => $emit('cancel')" />
  </q-card>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
</script>
