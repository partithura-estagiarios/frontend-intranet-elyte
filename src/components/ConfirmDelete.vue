<script setup lang="ts">
const emit = defineEmits(["cancel", "confirm"]);

defineProps({
  ramalItem: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <DynamicDialog v-bind="$props">
    <slot name="text" />
    <q-card-actions align="right">
      <q-btn
        flat
        :label="$t('action.confirm.index')"
        color="primary"
        @click="emit('confirm', ramalItem.id)"
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
