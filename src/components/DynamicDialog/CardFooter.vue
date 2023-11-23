<template>
  <q-card-actions align="right" class="q-pa-lg">
    <q-btn
      v-if="!close && !hideControls"
      flat
      :label="$t('action.confirm.index')"
      color="primary"
      @click="emit('confirm')"
    />
  </q-card-actions>
</template>
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
  hideControls: {
    type: Boolean,
    default: false,
  },
});
</script>
