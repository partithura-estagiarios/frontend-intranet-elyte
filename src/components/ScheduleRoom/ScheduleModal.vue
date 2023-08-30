<script setup lang="ts">
import { DateTime } from "luxon";

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    required: true,
  },
});

function parseDate(date: number) {
  return DateTime.fromMillis(date).toFormat("HH:mm");
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    :open="isActive"
    :title="item.description"
    closeLabel="Fechar"
    close
  >
    <div class="column q-px-lg q-py-md text-black text-body1 q-gutter-md">
      <span class="text-h6">{{ $t("titles.info", 2) }}</span>
      <span>
        <q-icon name="person" />
        Nome:
        {{ item.userCreated }}
      </span>
      <span>
        <q-icon name="schedule" />
        Horário:
        {{ parseDate(item.initialTime) + " às " + parseDate(item.finalTime) }}
      </span>

      <q-separator />

      <div class="column q-gutter-y-md">
        <span class="text-h6">{{ $t("label.suport.index") }}</span>
        <span>
          <q-icon name="computer" />
          Computador:
          {{ item.suport.computer }}
        </span>
        <span>
          <q-icon name="videocam" />
          Projetor:
          {{ item.suport.computer }}
        </span>
        <span>
          <q-icon name="computer" />
          Água:
          {{ item.suport.water }}
        </span>
        <span>
          <q-icon name="videocam" />
          Café:
          {{ item.suport.coffee }}
        </span>
      </div>
    </div>
  </DynamicDialog>
</template>
