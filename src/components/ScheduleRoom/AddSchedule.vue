<script setup lang="ts">
import { parseTimestamp } from "@quasar/quasar-ui-qcalendar";
import { Room, Event } from "../../entities";
import { DateTime } from "luxon";
import { QSelect } from "quasar";

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
const date = ref(null);
// Dados de sala mockados
const rooms = [
  { id: 1, name: "Sala A", color: "blue-5" },
  { id: 2, name: "Sala B", color: "green-9" },
];

const form: Event = {
  userCreated: "",
  roomId: "",
  description: "",
  initialTime: "",
  finalTime: "",
  suport: {
    computer: false,
    projector: false,
    coffee: false,
    water: false,
  },
};

function parseDateToObject(tsDate: any) {
  const { day, month, year, hour, minute } = tsDate;
  return { day, month, year, hour, minute };
}

function setDate(paramsDate: keyof Omit<Event, "suport">, select: QSelect) {
  if (date.value) {
    const parsedDate = parseDateToObject(parseTimestamp(date.value));
    form[paramsDate] = DateTime.fromObject(parsedDate).toString();
  }

  select.hidePopup();
  date.value = null;
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    :open="isActive"
    :title="'Agendar Evento'"
  >
    <div class="row q-px-lg q-py-md text-black text-body1">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('label.name')"
        v-model="form.userCreated"
      />
      <q-select
        class="col-6 q-px-xs"
        label="Local"
        v-model="form.roomId"
        popup-content-class="text-black"
        :options="rooms"
        :option-label="(room: Room) => room.name"
        :option-value="(room: Room) => room.id"
      />
      <q-select
        class="col-6 q-px-xs"
        label="Data Inicial"
        v-model="form.initialTime"
        ref="select"
      >
        <template #no-option>
          <div class="row justify-center">
            <q-date
              v-if="date === null"
              class="text-black"
              v-model="date"
              minimal
              flat
              mask="YYYY-MM-DD HH:mm"
            />
            <q-time
              v-else
              flat
              v-model="date"
              mask="YYYY-MM-DD HH:mm"
              class="text-black col-8"
              format24h
              @click="setDate('initialTime', $refs.select as QSelect)"
            />
          </div>
        </template>
      </q-select>
      <q-select
        class="col-6 q-px-xs"
        label="Data Final"
        v-model="form.finalTime"
      >
        <template #no-option>
          <div class="row justify-center">
            <q-date
              v-if="date === null"
              class="text-black"
              v-model="date"
              minimal
              flat
              mask="YYYY-MM-DD HH:mm"
            />
            <q-time
              v-else
              flat
              v-model="date"
              mask="YYYY-MM-DD HH:mm"
              class="text-black col-8"
              format24h
              @click="setDate('finalTime', $refs.select as QSelect)"
            />
          </div>
        </template>
      </q-select>
      <q-input
        class="col-12 q-px-xs"
        :label="$t('label.description')"
        v-model="form.description"
      />
      <div class="column q-mt-md">
        <span class="text-h6">Materiais de apoio</span>
        <q-checkbox v-model="form.suport.computer" label="Computador" />
        <q-checkbox v-model="form.suport.projector" label="Projetor" />
        <q-checkbox v-model="form.suport.water" label="Água" />
        <q-checkbox v-model="form.suport.coffee" label="Café" />
      </div>
    </div>
  </DynamicDialog>
</template>

<style>
.q-time__header {
  display: none;
}
</style>
