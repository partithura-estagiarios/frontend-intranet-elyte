<script setup lang="ts">
import { Form } from "vee-validate";
import { scheduleSchema } from "../../validation";
import type { Event, EventForm, Room } from "../../entities/Event";

import AddEvent from "../../graphql/events/AddEvent.gql";
import GetBusyRoom from "../../graphql/rooms/GetBusyRoom.gql";

const emits = defineEmits(["reload", "cancel"]);
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

const form: Event = reactive({
  initialTime: null,
  finalTime: null,
  roomId: "",
  userCreated: "",
  description: "",
  ramalNumber: 0,
  totalPeople: 0,
  userRegistration: 0,
  email: "",
  support: {
    computer: false,
    projector: false,
    coffee: false,
    water: false,
    speaker: false,
    flipChart: false,
  },
});

const invalidRoom: unknown = ref([]);
watch(form, async () => {
  const getInvalidRoom = await runQuery(GetBusyRoom, {
    initialTime: form.initialTime,
    finalTime: form.finalTime,
  });
  invalidRoom.value = getInvalidRoom?.getBusyRoom;
});

const selectRoom = computed(() => !(form.initialTime && form.finalTime));

function isRoomInvalid(idToCheck: number, invalidRooms: unknown) {
  return invalidRooms.value.some(
    (element: unknown) => element.id === idToCheck
  );
}

const checkForInvalidRooms = computed(
  (props) =>
    (room = props.rooms): Record<number, Room> => {
      const roomIdToCheck = room.id;
      const isInvalid = isRoomInvalid(roomIdToCheck, invalidRoom);
      return isInvalid;
    }
);

const roomName = computed(
  (props) =>
    (room = props.rooms as Room) =>
      room.name
);

const roomId = computed(
  (props) =>
    (room = props.rooms as Room) =>
      room.id
);

const group = ref([]);
const options = [
  {
    icon: "computer",
    value: "computer",
    label: t("label.support.computer"),
  },
  {
    icon: "mdi-projector",
    value: "projector",
    label: t("label.support.projector"),
  },
  {
    icon: "mdi-script",
    value: "flipChart",
    label: t("label.support.flipChart"),
  },
  {
    icon: "speaker",
    value: "speaker",
    label: t("label.support.speaker"),
  },
  {
    icon: "water_drop",
    value: "water",
    label: t("label.support.water"),
  },
  {
    icon: "coffee",
    value: "coffee",
    label: t("label.support.coffee"),
  },
];
function setDate(
  paramsDate: keyof Pick<Event, "initialTime" | "finalTime">,
  time: number
) {
  form[paramsDate] = time;
}

function triggerwarning() {
  if (selectRoom.value) {
    negativeNotify(t("warning.dateFieldEmpty"));
  }
}

function safeParseInt(value: string | number): number {
  if (typeof value === "string") {
    return parseInt(value);
  }
  return value;
}

function parse(data: EventForm) {
  return {
    ...data,
    support: form.support,
    finalTime: form.finalTime,
    initialTime: form.initialTime,
    totalPeople: safeParseInt(data.totalPeople),
    ramalNumber: safeParseInt(data.ramalNumber),
    userRegistration: safeParseInt(data.userRegistration),
  };
}

async function addEvent(formData: EventForm) {
  try {
    await runMutation(AddEvent, { data: parse(formData) });
    positiveNotify(t("notifications.success.scheduleEvent"));
    emits("reload");
    return;
  } catch (error) {
    negativeNotify(t("notifications.fail.scheduleEvent"));
  }
}
</script>

<template>
  <DynamicDialog
    :open="isActive"
    :title="$t('action.scheduleEvent')"
    hide-controls
  >
    <Form
      @submit="addEvent"
      :validation-schema="scheduleSchema"
      class="row q-pa-md text-black text-body1 q-gutter-y-sm justify-around"
    >
      <StandardInput
        field-name="userCreated"
        field-color="white"
        class="schedule-item-border col-5"
        :field-label="$t('label.name.pronoun')"
        borderless
        icon-name="person"
        icon-class="bg-primary fit q-px-xs"
        icon-size="md"
        icon-color="white"
      />

      <StandardInput
        field-name="userRegistration"
        field-color="white"
        class="schedule-item-border col-5"
        :field-label="$t('label.register.pronoun')"
        fieldType="number"
        borderless
        icon-name="mdi-card-account-details-outline"
        icon-class="bg-primary fit q-px-xs"
        icon-size="md"
        icon-color="white"
      />

      <StandardInput
        field-name="ramalNumber"
        field-color="white"
        class="schedule-item-border col-5"
        :field-label="$t('label.ramalOrPhone')"
        fieldMask="###########"
        field-type="number"
        borderless
        icon-name="mdi-phone-in-talk"
        icon-class="bg-primary fit q-px-xs"
        icon-size="md"
        icon-color="white"
      />

      <StandardInput
        field-name="email"
        field-color="white"
        class="schedule-item-border col-5"
        :field-label="$t('label.email')"
        borderless
        icon-name="email"
        icon-class="bg-primary fit q-px-xs"
        icon-size="md"
        icon-color="white"
      />

      <SelectTime
        type="initial"
        :time-value="form.initialTime"
        class="schedule-item-border col-5"
        :field-label="$t('label.date.initial')"
        @setTime="(args) => setDate('initialTime', args)"
      />

      <SelectTime
        type="final"
        :time-value="form.finalTime"
        class="schedule-item-border col-5"
        :field-label="$t('label.date.final')"
        @setTime="(args) => setDate('finalTime', args)"
      />

      <StandardInput
        field-name="totalPeople"
        field-color="white"
        class="schedule-item-border col-5"
        :field-label="$t('label.numberParticipants')"
        field-mask="##"
        field-type="number"
        borderless
        icon-name="groups"
        icon-class="bg-primary fit q-px-xs"
        icon-size="md"
        icon-color="white"
      />

      <StandardSelect
        :option-label="roomName"
        :option-value="roomId"
        :options-to-disable="checkForInvalidRooms"
        :options-to-select="rooms"
        :disableSelect="selectRoom"
        field-name="roomId"
        field-color="white"
        class="schedule-item-border col-5"
        :field-label="$t('label.room')"
        borderless
        icon-name="mdi-map-marker-radius"
        icon-class="bg-primary fit q-px-xs"
        icon-size="md"
        icon-color="white"
        popup-content-class="text-black"
        @click="triggerwarning"
      />

      <StandardInput
        field-name="description"
        field-color="white"
        class="q-px-md q-mt-md schedule-item-border col-11"
        :field-label="$t('label.description')"
        borderless
      />

      <div class="q-ma-lg">
        <span
          class="q-py-sm q-px-xl q-ml-lg text-h6 bg-primary text-white schedule-item-border"
        >
          {{ $t("label.support.index") }}
        </span>
        <div class="q-gutter-md q-mt-md row justify-around">
          <q-option-group
            v-model="group"
            type="checkbox"
            :options="options"
            left-label
            class="q-gutter-md col-10"
            :inline="true"
          >
            <template v-slot:label="opt">
              <div class="schedule-item-border">
                <q-icon
                  :name="opt.icon"
                  color="white"
                  size="sm"
                  class="bg-primary q-pa-md"
                />
                <span class="q-pa-md">{{ opt.label }}</span>
              </div>
            </template>
          </q-option-group>
        </div>
      </div>
      <Button class="bg-transparent no-padding">
        <q-btn
          flat
          :label="$t('action.confirm.index')"
          color="primary"
          @click="triggerwarning"
        />
      </Button>
    </Form>
  </DynamicDialog>
</template>

<style scoped>
.schedule-item-border {
  border: 1px solid #ff0321;
  border-radius: 5px;
}
</style>
