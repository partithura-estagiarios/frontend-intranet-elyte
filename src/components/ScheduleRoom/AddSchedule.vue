<script setup lang="ts">
import { QSelect } from "quasar";
import { Room, Event } from "../../entities";
import AddEvent from "../../graphql/events/AddEvent.gql";
import { DateTime } from "luxon";

const emits = defineEmits(["reload"]);
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  rooms: {
    type: Array,
    required: true,
  },
});

const form: Omit<Event, "id"> = reactive({
  userCreated: "",
  roomId: "",
  description: "",
  initialTime: null as unknown as string,
  finalTime: null as unknown as string,
  suport: {
    computer: false,
    projector: false,
    coffee: false,
    water: false,
  },
});
function setDate(
  paramsDate: keyof Pick<Event, "initialTime" | "finalTime">,
  time: number
) {
  const formattedDate = DateTime.fromMillis(time)
    .setLocale("pt-BR")
    .toLocaleString(DateTime.DATE_SHORT);
  form[paramsDate] = formattedDate;
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
      <SelectTime
        @setTime="(args) => setDate('initialTime', args)"
        v-model="form.initialTime"
        :label="$t('label.date.initial')"
        type="initial"
      />
      <SelectTime
        :label="$t('label.date.final')"
        @setTime="(args) => setDate('finalTime', args)"
        v-model="form.finalTime"
        type="final"
      />
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
.q-menu:has(> div.date-menu) {
  max-width: 10% !important;
}
</style>
