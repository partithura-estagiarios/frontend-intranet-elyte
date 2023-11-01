<template>
  <q-card-actions class="row justify-end q-mr-md" v-if="!hideControls">
    <div>
      <q-btn
        v-if="!close"
        flat
        :label="$t('action.confirm.index')"
        color="primary"
        @click="emit('confirm')"
      />
    </div>
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
