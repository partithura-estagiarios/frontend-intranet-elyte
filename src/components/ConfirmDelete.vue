<template>
  <DynamicDialog v-bind="$props" :title="$t('action.confirm.index')">
    <span class="text-subtitle1">{{ text }}</span>
    <q-card-actions align="right">
      <q-btn
        flat
        :label="$t('action.confirm.index')"
        color="primary"
        @click="emit('confirm', id)"
      />
      <q-btn
        flat
        :label="$t('action.cancel.index')"
        color="primary"
        @click="emit('cancel')"
      />
    </q-card-actions>
  </DynamicDialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["cancel", "confirm"]);
defineProps({
  text: String,
  id: String,
});
</script>
