<template>
  <q-card-actions align="right">
    <q-btn
      flat
      :label="$t('action.cancel.index')"
      color="primary"
      @click="emit('cancel')"
    />
    <q-btn
      flat
      :label="$t('action.confirm.index')"
      color="primary"
      @click="emit('confirm')"
    />
  </q-card-actions>
</template>
<script setup lang="ts">
const emit = defineEmits(["cancel", "confirm"]);
</script>
