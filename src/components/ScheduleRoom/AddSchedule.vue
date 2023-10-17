<script setup lang="ts">
import { QSelect } from "quasar";
import { Room, Event } from "../../entities";
import AddEvent from "../../graphql/events/AddEvent.gql";
import GetBusyRoom from "../../graphql/rooms/GetBusyRoom.gql";
import { scheduleSchema } from "../../validation";

import { Form, Field } from "vee-validate";
const form = ref(null);

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
const invalidRoom = ref();

const formProps = reactive({
  userCreated: "",
  roomId: null as null | string,
  description: "",
  initialTime: null as unknown as Record<string, string>,
  finalTime: null as unknown as Record<string, string>,
  support: {
    computer: false,
    projector: false,
    coffee: false,
    water: false,
  },
});

const suportsMaterial = [
  {
    model: formProps.support.computer,
    icon: "computer",
    label: t("label.suport.computer"),
  },
  {
    model: formProps.support.projector,
    icon: "mdi-projector",
    label: t("label.suport.projector"),
  },
  {
    model: formProps.support.computer,
    icon: "mdi-script",
    label: "Flip-Chart", // adicionar model
  },
  {
    model: formProps.support.computer,
    icon: "speaker",
    label: "Equipamento de Som", // adicionar model
  },
  {
    model: formProps.support.water,
    icon: "water_drop",
    label: t("label.suport.water"),
  },
  {
    model: formProps.support.coffee,
    icon: "coffee",
    label: t("label.suport.coffee"),
  },
];
function setDate(
  paramsDate: keyof Pick<Event, "initialTime" | "finalTime">,
  time: number
) {
  (form as unknown as { [key: string]: number })[paramsDate] = time;
}

watch(formProps, async () => {
  const getInvalidRoom = await runQuery(GetBusyRoom, {
    initialTime: formProps.initialTime,
    finalTime: formProps.finalTime,
  });
  invalidRoom.value = getInvalidRoom.getBusyRoom;
});

async function addEvent() {
  try {
    const { addEvent } = await runMutation(AddEvent, { data: formProps });
    positiveNotify(t("notifications.success.scheduleEvent"));
    emits("reload");
    return;
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
    <Form
      ref="form"
      class="row q-px-md q-py-md text-black text-body1 q-gutter-y-sm justify-around"
      :validation-schema="scheduleSchema"
      @submit="addEvent"
    >
      <Field name="name" v-slot="{ field, value }">
        <q-input
          :model-value="value"
          v-bind="field"
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
        </q-input>
      </Field>

      <Field name="register" v-slot="{ field, value }">
        <q-input
          :model-value="value"
          v-bind="field"
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
        </q-input>
      </Field>

      <Field name="ramal" v-slot="{ field, value }">
        <q-input
          :model-value="value"
          v-bind="field"
          borderless
          mask="###########"
          bg-color="white"
          class="schedule-item-border col-5"
          :label="$t('label.ramalNumber')"
        >
          <template #prepend>
            <q-icon
              name="mdi-phone-in-talk"
              class="bg-primary fit q-px-xs"
              size="md"
              color="white"
            />
          </template>
        </q-input>
      </Field>

      <Field name="email" v-slot="{ field, value }">
        <q-input
          :model-value="value"
          v-bind="field"
          class="schedule-item-border col-5"
          bg-color="white"
          borderless
          :label="$t('label.email')"
        >
          <template #prepend>
            <q-icon
              name="email"
              class="bg-primary fit q-px-xs"
              size="md"
              color="white"
            />
          </template>
        </q-input>
      </Field>

      <Field name="initialDate" v-slot="{ field, value }">
        <SelectTime
          class="schedule-item-border col-5"
          :model-value="value"
          v-bind="field"
          :label="$t('label.date.initial')"
          type="initial"
        />
      </Field>

      <Field name="finalDate" v-slot="{ field, value }">
        <SelectTime
          class="schedule-item-border col-5"
          :model-value="value"
          v-bind="field"
          :label="$t('label.date.final')"
          type="final"
        />
      </Field>

      <Field name="participants" v-slot="{ field, value }">
        <q-input
          class="schedule-item-border col-5"
          mask="##"
          borderless
          bg-color="white"
          :label="$t('label.numberParticipants')"
          :model-value="value"
          v-bind="field"
        >
          <template #prepend>
            <q-icon
              name="groups"
              class="bg-primary fit q-px-xs"
              size="md"
              color="white"
            />
          </template>
        </q-input>
      </Field>

      <Field name="local" v-slot="{ field, value }">
        <q-select
          class="schedule-item-border col-5"
          bg-color="white"
          borderless
          :label="$t('label.room')"
          popup-content-class="text-black"
          map-options
          emit-value
          :model-value="value"
          v-bind="field"
          :disable="formProps.initialTime && formProps.finalTime ? false : true"
          :option-disable="(room: Room) => invalidRoom.find((invalidRoom: Room) => invalidRoom.id === room.id) ? true : false"
          :options="rooms"
          :option-label="(room: Room) => room.name"
          :option-value="(room: Room) => room.id"
        >
          <template #prepend>
            <q-icon
              name="mdi-map-marker-radius"
              class="bg_primary fit q-px-xs"
              size="md"
              color="white"
            />
          </template>
        </q-select>
      </Field>

      <Field name="description" class="col-11" v-slot="{ field, value }">
        <q-input
          class="q-px-md q-mt-md schedule-item-border col-11"
          borderless
          bg-color="white"
          :label="$t('label.description')"
          :model-value="value"
          v-bind="field"
        />
      </Field>
    </Form>

    <div class="q-py-md q-px-lg">
      <span
        class="q-py-sm q-px-xl q-ml-lg text-h6 bg-primary text-white schedule-item-border"
      >
        {{ $t("label.suport.index") }}
      </span>
      <div class="row q-mt-md q-px-lg text-black">
        <q-list class="row justify-between q-gutter-md">
          <q-checkbox
            v-for="(suport, index) in suportsMaterial"
            :key="index"
            class="row col-5 justify-between schedule-item-border"
            v-model="formProps.support.computer"
            left-label
          >
            <div class="row">
              <q-icon
                :name="suport.icon"
                class="bg-primary q-pa-md"
                color="white"
                size="sm"
              />
              <q-item-label class="q-pa-md">{{ suport.label }}</q-item-label>
            </div>
          </q-checkbox>
          <q-input
            class="col-12 q-px-md q-mt-md schedule-item-border"
            borderless
            bg-color="white"
            :label="'Outros. Ex: Folha A4, caneta'"
            v-model="formProps.description"
          />
        </q-list>
      </div>
    </div>
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
</style>
