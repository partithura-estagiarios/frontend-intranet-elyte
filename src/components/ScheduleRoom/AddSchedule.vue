<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { Room, Event, EventForm } from "../../entities";
import { scheduleSchema } from "../../validation";

import AddEvent from "../../graphql/events/AddEvent.gql";
import GetBusyRoom from "../../graphql/rooms/GetBusyRoom.gql";

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
  initialTime: "",
  finalTime: "",
  support: {
    computer: false,
    projector: false,
    coffee: false,
    water: false,
    speaker: false,
    flipChart: false,
  },
});

const group = ref([]);
const options = [
  {
    label: t("label.support.computer"),
    value: "computer",
    icon: "computer",
  },
  {
    label: t("label.support.projector"),
    value: "projector",
    icon: "mdi-projector",
  },
  {
    label: t("label.support.flipChart"),
    value: "flipChart",
    icon: "mdi-script",
  },
  {
    label: t("label.support.speaker"),
    value: "speaker",
    icon: "speaker",
  },
  {
    label: t("label.support.water"),
    value: "water",
    icon: "water_drop",
  },
  {
    label: t("label.support.coffee"),
    value: "coffee",
    icon: "coffee",
  },
];

function setDate(
  paramsDate: keyof Pick<Event, "initialTime" | "finalTime">,
  time: number
) {
  form[paramsDate] = time;
}

const invalidRoom: unknown = [];
watch(form, async () => {
  const getInvalidRoom = await runQuery(GetBusyRoom, {
    initialTime: form.initialTime,
    finalTime: form.finalTime,
  });
  invalidRoom.push(getInvalidRoom?.getBusyRoom);
});

async function addEvent(data: EventForm) {
  data.initialTime = form.initialTime;
  data.finalTime = form.finalTime;
  data.support = form.support;
  data.userRegistration = parseInt(data.userRegistration);
  data.totalPeople = parseInt(data.totalPeople);
  data.ramalNumber = parseInt(data.ramalNumber);

  try {
    const addEvent = await runMutation(AddEvent, { data });
    if (addEvent) {
      positiveNotify(t("notifications.success.scheduleEvent"));
      emits("reload");
      return;
    }
    negativeNotify("Data inválida");
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
    <Form
      @submit="addEvent"
      :validation-schema="scheduleSchema"
      class="row q-pa-md text-black text-body1 q-gutter-y-sm justify-around"
    >
      <Field name="userCreated" v-slot="item" class="">
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
          map-options
          emit-value
          :model-value="item.value"
          @update:model-value="form.roomId"
          v-bind="item.field"
          :disable="form.initialTime && form.finalTime ? false : true"
          :options="rooms"
          :option-label="(room: Room) => room.name"
          :option-value="(room: Room) => room.id"
          :option-disable="(room: Room) => invalidRoom.find((invalidRoom: Room) => invalidRoom?.id === room.id) ? true : false"
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