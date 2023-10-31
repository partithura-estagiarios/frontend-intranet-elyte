<script setup lang="ts">
import { Form, Field } from "vee-validate";
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

const supportMaterials = ref([
  {
    icon: "computer",
    value: form.support.computer,
    label: t("label.support.computer"),
  },
  {
    icon: "mdi-projector",
    value: form.support.projector,
    label: t("label.support.projector"),
  },
  {
    icon: "mdi-script",
    value: form.support.flipChart,
    label: t("label.support.flipChart"),
  },
  {
    icon: "speaker",
    value: form.support.speaker,
    label: t("label.support.speaker"),
  },
  {
    icon: "water_drop",
    value: form.support.water,
    label: t("label.support.water"),
  },
  {
    icon: "coffee",
    value: form.support.coffee,
    label: t("label.support.coffee"),
  },
]);

function setDate(
  paramsDate: keyof Pick<Event, "initialTime" | "finalTime">,
  time: number
) {
  form[paramsDate] = time;
}

function triggerwarning() {
  if (selectRoom.value) {
    negativeNotify(t("warning.dateFieldEmpty"));
  } else if (form.initialTime > form.finalTime) {
    negativeNotify(t("warning.dateFieldInvalid"));
  }
}

function safeParseInt(value: string | number): number {
  if (typeof value === "string") {
    return parseInt(value);
  }
  return value;
}

function clearInput() {
  form.initialTime = null;
  form.finalTime = null;
  supportMaterials.value.forEach((material) => (material.value = false));
}

function parseFormData(data: EventForm) {
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
    await runMutation(AddEvent, { data: parseFormData(formData) });
    positiveNotify(t("notifications.success.scheduleEvent"));
    clearInput();
    emits("reload");
    return;
  } catch (error) {
    negativeNotify(t("notifications.fail.scheduleEvent"));
  }
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    :open="isActive"
    :title="$t('action.scheduleEvent')"
    hide-controls
  >
    <Form
      @submit="addEvent"
      :validation-schema="scheduleSchema"
      class="row justify-evenly"
    >
      <div class="row q-pa-md text-body1 q-gutter-sm justify-around">
        <StandardInput
          field-name="userCreated"
          class="schedule-item-border col-5"
          :field-label="$t('label.name.pronoun')"
          borderless
          icon-name="person"
          icon-class=" fit q-px-xs"
          icon-size="md"
          icon-color="primary"
        />

        <StandardInput
          field-name="userRegistration"
          class="schedule-item-border col-5"
          :field-label="$t('label.register.pronoun')"
          fieldType="number"
          borderless
          icon-name="mdi-card-account-details-outline"
          icon-class=" fit q-px-xs"
          icon-size="md"
          icon-color="primary"
        />

        <StandardInput
          field-name="ramalNumber"
          class="schedule-item-border col-5"
          :field-label="$t('label.ramalOrPhone')"
          fieldMask="###########"
          field-type="number"
          borderless
          icon-name="mdi-phone-in-talk"
          icon-class="fit q-px-xs"
          icon-size="md"
          icon-color="primary"
        />

        <StandardInput
          field-name="email"
          class="schedule-item-border col-5"
          :field-label="$t('label.email')"
          borderless
          icon-name="email"
          icon-class=" fit q-px-xs"
          icon-size="md"
          icon-color="primary"
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
          class="schedule-item-border col-5"
          :field-label="$t('label.numberParticipants')"
          field-mask="##"
          field-type="number"
          borderless
          icon-name="groups"
          icon-class=" fit q-px-xs"
          icon-size="md"
          icon-color="primary"
        />

        <StandardSelect
          :option-label="roomName"
          :option-value="roomId"
          :options-to-disable="checkForInvalidRooms"
          :options-to-select="rooms"
          :disableSelect="selectRoom"
          field-name="roomId"
          class="schedule-item-border col-5"
          :field-label="$t('label.room')"
          borderless
          icon-name="mdi-map-marker-radius"
          icon-class=" fit q-px-xs"
          icon-size="md"
          icon-color="primary"
          popup-content-class="text-black"
          @click="triggerwarning"
        />

        <Field name="description" v-slot="item">
          <q-input
            v-bind="item.field"
            :label="$t('label.description')"
            borderless
            class="q-pl-md q-mt-md schedule-item-border col-11"
            :model-value="item.value"
          >
            <span v-if="item.errorMessage" class="text-red">
              {{ parseErrorMessage(item.errorMessage) }}
            </span>
          </q-input>
        </Field>
      </div>

      <div class="q-px-xl">
        <q-card class="q-py-md no-shadow">
          <div class="text-grey-9">
            <span class="q-py-sm q-px-xl text-h6 schedule-item-border">
              {{ $t("label.support.index") }}
            </span>
            <div class="q-gutter-md q-mt-md row">
              <q-checkbox
                v-for="(material, index) in supportMaterials"
                :key="index"
                v-model="material.value"
                class="q-pl-sm"
                left-label
              >
                <div class="schedule-item-border options-materials q-ma-sm">
                  <q-icon
                    :name="material.icon"
                    color="primary"
                    size="sm"
                    class="q-pa-md"
                  />
                  <span class="q-pa-md">{{ material.label }}</span>
                </div>
              </q-checkbox>
            </div>
          </div>
        </q-card>
        <Button class="bg-transparent q-mt-lg">
          <q-btn
            flat
            :label="$t('action.confirm.index')"
            color="white"
            @click="triggerwarning"
            class="bg-primary q-mr-xl text-h6 absolute-bottom-right"
          />
        </Button>
      </div>
    </Form>
  </DynamicDialog>
</template>

<style>
.q-menu:has(> div.date-menu) {
  max-width: 10% !important;
}
.schedule-item-border {
  border: 1px solid #ff0321;
  border-radius: 5px;
}
.options-materials {
  width: 318px;
}
</style>
