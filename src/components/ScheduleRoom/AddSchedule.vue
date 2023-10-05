<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { scheduleSchema } from "../../validation";
import { Room, Event, EventForm } from "../../entities";

import AddEvent from "../../graphql/events/AddEvent.gql";
import GetBusyRoom from "../../graphql/rooms/GetBusyRoom.gql";

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

const emits = defineEmits(["reload"]);

const form: Omit<Event, "id"> = reactive({
  initialTime: null as unknown as string | number,
  finalTime: null as unknown as string | number,
  roomId: null as unknown as string,
  userCreated: null as unknown as string,
  description: null as unknown as string,
  ramalNumber: null as unknown as number,
  totalPeople: null as unknown as number,
  userRegistration: null as unknown as number,
  email: null as unknown as string,
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

const checkForInvalidRooms = computed((props) => (room = props.rooms) => {
  const roomIdToCheck = room.id;
  const isInvalid = isRoomInvalid(roomIdToCheck, invalidRoom);
  return isInvalid;
});

const roomName = computed(
  (props) =>
    (room = props.rooms) =>
      room.name
);

const roomId = computed(
  (props) =>
    (room = props.rooms) =>
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

async function addEvent(data: EventForm) {
  data.support = form.support;
  data.finalTime = form.finalTime;
  data.initialTime = form.initialTime;
  data.totalPeople = parseInt(data.totalPeople);
  data.ramalNumber = parseInt(data.ramalNumber);
  data.userRegistration = parseInt(data.userRegistration);

  try {
    const addEvent = await runMutation(AddEvent, { data });
    if (addEvent) {
      positiveNotify(t("notifications.success.scheduleEvent"));
      emits("reload");
      return;
    }
    negativeNotify("notifications.fail.data");
  } catch (error) {
    negativeNotify(t("notifications.fail.scheduleEvent"));
  }
}
</script>

<template>
  <DynamicDialog
    hide-controls
    :open="isActive"
    :title="$t('action.scheduleEvent')"
  >
    <!-- Criar um component para os fields -->
    <Form
      @submit="addEvent"
      :validation-schema="scheduleSchema"
      class="row q-pa-md text-black text-body1 q-gutter-y-sm justify-around"
    >
      <Field name="userCreated" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          borderless
          bg-color="white"
          class="schedule-item-border col-5"
          :label="$t('label.name.pronoun')"
        >
          <template #prepend>
            <q-icon
              name="person"
              class="bg-primary fit q-px-xs"
              size="md"
              color="white"
            />
          </template>
          <span v-if="item.errorMessage" class="text-red">
            {{ parseErrorMessage(item.errorMessage) }}
          </span>
        </q-input>
      </Field>

      <Field name="userRegistration" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          borderless
          bg-color="white"
          type="number"
          class="schedule-item-border col-5"
          :label="$t('label.register.pronoun')"
        >
          <template #prepend>
            <q-icon
              name="mdi-card-account-details-outline"
              class="bg-primary fit q-px-xs"
              size="md"
              color="white"
            />
          </template>
          <span v-if="item.errorMessage" class="text-red">
            {{ parseErrorMessage(item.errorMessage) }}
          </span>
        </q-input>
      </Field>

      <Field name="ramalNumber" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          borderless
          mask="###########"
          bg-color="white"
          class="schedule-item-border col-5"
          :label="$t('label.ramalOrPhone')"
        >
          <template #prepend>
            <q-icon
              name="mdi-phone-in-talk"
              class="bg-primary fit q-px-xs"
              size="md"
              color="white"
            />
          </template>
          <span v-if="item.errorMessage" class="text-red">
            {{ parseErrorMessage(item.errorMessage) }}
          </span>
        </q-input>
      </Field>

      <Field name="email" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          class="schedule-item-border col-5"
          bg-color="white"
          borderless
          label="E-mail"
          lazy-rules
        >
          <template #prepend>
            <q-icon
              name="email"
              class="bg-primary fit q-px-xs"
              size="md"
              color="white"
              @click="addEvent"
            />
          </template>
          <span v-if="item.errorMessage" class="text-red">
            {{ parseErrorMessage(item.errorMessage) }}
          </span>
        </q-input>
      </Field>

      <Field name="initialTime" v-slot="item">
        <SelectTime
          class="schedule-item-border col-5"
          :model-value="form.initialTime"
          @update:model-value="item.value"
          v-bind="item.field"
          :label="$t('label.date.initial')"
          type="initial"
          @setTime="(args) => setDate('initialTime', args)"
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <Field name="finalTime" v-slot="item">
        <SelectTime
          class="schedule-item-border col-5"
          :model-value="form.finalTime"
          @update:model-value="item.value"
          v-bind="item.field"
          :label="$t('label.date.final')"
          type="final"
          @setTime="(args) => setDate('finalTime', args)"
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <Field name="totalPeople" v-slot="item">
        <q-input
          class="schedule-item-border col-5"
          mask="##"
          borderless
          bg-color="white"
          :label="$t('label.numberParticipants')"
          :model-value="item.value"
          v-bind="item.field"
        >
          <template #prepend>
            <q-icon
              name="groups"
              class="bg-primary fit q-px-xs"
              size="md"
              color="white"
            />
          </template>
          <span v-if="item.errorMessage" class="text-red">
            {{ parseErrorMessage(item.errorMessage) }}
          </span>
        </q-input>
      </Field>

      <Field name="roomId" v-slot="item">
        <q-select
          class="schedule-item-border col-5"
          bg-color="white"
          borderless
          :label="$t('label.room')"
          popup-content-class="text-black"
          emit-value
          map-options
          :model-value="item.value"
          @update:model-value="form.roomId"
          v-bind="item.field"
          :disable="selectRoom"
          :options="rooms"
          :option-label="roomName"
          :option-value="roomId"
          :option-disable="checkForInvalidRooms"
        >
          <template #prepend>
            <q-icon
              name="mdi-map-marker-radius"
              class="bg-primary fit q-px-xs"
              size="md"
              color="white"
            />
          </template>
        </q-select>
      </Field>

      <Field name="description" class="col-11" v-slot="item">
        <q-input
          class="q-px-md q-mt-md schedule-item-border col-11"
          borderless
          bg-color="white"
          :label="$t('label.description')"
          :model-value="item.value"
          v-bind="item.field"
        >
          <span v-if="item.errorMessage" class="text-red">
            {{ parseErrorMessage(item.errorMessage) }}
          </span>
        </q-input>
      </Field>

      <div class="q-py-md q-px-lg">
        <span
          class="q-py-sm q-px-xl q-ml-lg text-h6 bg-primary text-white schedule-item-border"
        >
          {{ $t("label.support.index") }}
        </span>
        <div class="q-gutter-md row q-mt-md justify-between">
          <q-option-group
            v-model="group"
            type="checkbox"
            :options="options"
            left-label
            class="q-gutter-md col-9"
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
        <q-btn flat :label="$t('action.confirm.index')" color="primary" />
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
