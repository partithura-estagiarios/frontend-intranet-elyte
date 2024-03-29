<script setup lang="ts">
import { DateTime } from "luxon";
import { Field } from "vee-validate";
import { QSelect } from "quasar";

defineProps({
  fieldLabel: {
    type: String,
    default: "",
  },
  fieldName: {
    type: String,
    default: "",
  },
  timeValue: {
    type: Number,
    default: "",
  },
});

const emits = defineEmits(["setTime"]);

const time = ref(null);
const date = ref(null);
const selectionStep = ref<"date" | "hour" | "minute" | null>(null);
const DAY_HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const minutes = ref<Array<number>>([]);

function generateTimeList(selectedHour: number): void {
  const times = [];
  const hour = new Date(date.value as unknown as number);
  hour.setHours(selectedHour);
  const hoursPlus30min = new Date(hour);
  hoursPlus30min.setMinutes(30);
  times.push(hour.getTime(), hoursPlus30min.getTime());
  minutes.value = times;
  selectionStep.value = "minute";
}

function resetValues() {
  time.value = null;
  date.value = null;
}

function finishSelector(minute: number, select: QSelect) {
  emits("setTime", minute);
  resetValues;
  selectionStep.value = null;
  select.hidePopup();
}

function reopenSelect() {
  resetValues;
  selectionStep.value = "date";
}
</script>

<template>
  <div>
    <Field :name="fieldName" v-slot="item">
      <q-select
        ref="selectDate"
        borderless
        map-options
        emit-value
        v-bind="item.field"
        :label="fieldLabel"
        class="col-5 row select"
        :model-value="timeValue"
        @popup-show="reopenSelect"
        :option-value="(date) => date"
        :option-label="
          (date) =>
            DateTime.fromMillis(date)
              .setLocale('pt-BR')
              .toFormat('dd/MM/yyyy HH:mm')
        "
      >
        <template #prepend>
          <q-icon
            name="mdi-calendar-clock"
            class="fit q-px-xs"
            size="md"
            color="primary"
          />
        </template>

        <template #no-option>
          <div class="row justify-center date-menu">
            <q-date
              flat
              minimal
              v-model="date"
              class="text-black"
              mask="YYYY-MM-DD HH:mm"
              @update:model-value="selectionStep = 'hour'"
              v-if="!selectionStep || selectionStep === 'date'"
            />
            <div v-else-if="selectionStep === 'hour'" class="text-black row">
              <div class="row q-pa-md">
                <q-item
                  dense
                  :key="hour"
                  clickable
                  class="item-size col-3"
                  v-for="hour in DAY_HOURS"
                  @click="generateTimeList(hour)"
                >
                  {{ DateTime.fromObject({ hour }).toFormat("HH:mm") }}
                </q-item>
              </div>
            </div>
            <div v-else class="text-black row">
              <div class="row q-pa-md">
                <q-item
                  dense
                  clickable
                  class="item-size col-6"
                  @click="finishSelector(minute, $refs.selectDate)"
                  v-for="(minute, index) in minutes"
                  :key="index"
                >
                  {{ DateTime.fromMillis(minute).toFormat("HH:mm") }}
                </q-item>
              </div>
            </div>
          </div>
        </template>
      </q-select>
    </Field>
  </div>
</template>
