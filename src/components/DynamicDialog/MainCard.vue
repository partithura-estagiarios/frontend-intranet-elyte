<template>
  <q-card class="column card-size">
    <CardHeader v-bind="$props" @cancel="() => $emit('cancel')" />
    <q-card-section>
      <slot />
    </q-card-section>
    <CardFooter
      v-bind="$props"
      @cancel="() => $emit('cancel')"
      @confirm="() => $emit('confirm')"
    />
  </q-card>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  closeLabel: String,
  close: Boolean,
  hideControls: Boolean,
});
</script>
<style scoped>
.card-size {
  max-width: 50vw;
  min-width: 20vw;
}
</style>
