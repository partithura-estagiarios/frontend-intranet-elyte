<script setup lang="ts">
const emit = defineEmits(["cancel", "confirm"]);

defineProps({
  closeLabel: {
    type: String,
    default: t("action.cancel.index"),
  },
  close: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <q-card-actions align="right" class="q-pa-lg">
    <q-btn flat :label="closeLabel" color="primary" @click="emit('cancel')" />
    <q-btn
      v-if="!close"
      flat
      :label="$t('action.confirm.index')"
      color="primary"
      @click="emit('confirm')"
    />
  </q-card-actions>
</template>
