<script setup lang="ts">
import { parseTimestamp } from "@quasar/quasar-ui-qcalendar";
import { DateTime } from "luxon";
import { QSelect } from "quasar";
import { Room, Event } from "../../entities";
import AddEvent from "../../graphql/events/addEvent.gql";

const emits = defineEmits(["reload"]);
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
const date = ref(null);
// Dados de sala mockados
const rooms = [
  { id: 1, name: "A", color: "blue-5" },
  { id: 2, name: "B", color: "green-9" },
];

const form: Event = reactive({
  userCreated: "",
  roomId: "",
  description: "",
  initialTime: null as unknown as number,
  finalTime: null as unknown as number,
  suport: {
    computer: false,
    projector: false,
    coffee: false,
    water: false,
  },
});

function parseDateToObject(tsDate: any) {
  const { day, month, year, hour, minute } = tsDate;
  return { day, month, year, hour, minute };
}

function setDate(
  paramsDate: keyof Pick<Event, "initialTime" | "finalTime">,
  select: QSelect
) {
  if (date.value) {
    const parsedDate = parseDateToObject(parseTimestamp(date.value));
    form[paramsDate] = DateTime.fromObject(parsedDate).toMillis();
  }
  select.hidePopup();
  date.value = null;
}

async function addEvent() {
  try {
    const { addEvent } = await runMutation(AddEvent, { data: form });
    if (addEvent) {
      positiveNotify(t("notifications.success.scheduleEvent"));
      emits("reload");
      return;
    }
    negativeNotify("Data inválida");
  } catch {
    negativeNotify(t("notifications.fail.scheduleEvent"));
  }
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    :open="isActive"
    :title="$t('action.scheduleEvent')"
    @confirm="addEvent"
  >
    <div class="row q-px-lg q-py-md text-black text-body1">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('label.name')"
        v-model="form.userCreated"
      />
      <q-select
        class="col-6 q-px-xs"
        :label="$t('label.room')"
        popup-content-class="text-black"
        map-options
        emit-value
        v-model="form.roomId"
        :options="rooms"
        :option-label="(room: Room) => room.name"
        :option-value="(room: Room) => room.id"
      />
      <q-select
        class="col-6 q-px-xs"
        :label="$t('label.date.initial')"
        v-model="form.initialTime"
        ref="initialSelect"
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
              @click="setDate('initialTime', $refs.initialSelect as QSelect)"
            />
          </div>
        </template>
      </q-select>
      <q-select
        class="col-6 q-px-xs"
        :label="$t('label.date.final')"
        v-model="form.finalTime"
        ref="finalSelect"
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
              @click="setDate('finalTime', $refs.finalSelect as QSelect)"
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
        <span class="text-h6">{{ $t("label.suport.index") }}</span>
        <q-checkbox
          v-model="form.suport.computer"
          :label="$t('label.suport.computer')"
        />
        <q-checkbox
          v-model="form.suport.projector"
          :label="$t('label.suport.projector')"
        />
        <q-checkbox
          v-model="form.suport.water"
          :label="$t('label.suport.water')"
        />
        <q-checkbox
          v-model="form.suport.coffee"
          :label="$t('label.suport.coffee')"
        />
      </div>
    </div>
  </DynamicDialog>
</template>

<style>
.q-time__header {
  display: none;
}
</style>
