<script setup lang="ts">
import { DateTime } from "luxon";

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
  const hoursPlus30 = new Date(hour);
  hoursPlus30.setMinutes(30);
  times.push(hour.getTime(), hoursPlus30.getTime());

  minutes.value = times;
  selectionStep.value = "minute";
}

function finishSelector(minute: number) {
  emits("setTime", minute);
  time.value = null;
  date.value = null;
  selectionStep.value = null;
}

function reopenSelect() {
  time.value = null;
  date.value = null;
  selectionStep.value = "date";
}
</script>

<template>
  <q-select
    class="col-5 row select"
    bg-color="white"
    borderless
    v-model="time"
    ref="initialSelect"
    @popup-show="reopenSelect"
    map-options
    emit-value
    :option-label="(date: number) => DateTime.fromMillis(+date).setLocale('pt-BR').toFormat('dd/MM/yyyy HH:mm')"
    :option-value="(date: number) => date"
  >
    <template #prepend>
      <q-icon
        name="mdi-calendar-clock"
        class="bg-primary fit q-px-xs"
        size="md"
        color="white"
      />
    </template>

    <template #no-option>
      <div class="row justify-center date-menu">
        <q-date
          v-if="!selectionStep || selectionStep === 'date'"
          class="text-black"
          v-model="date"
          minimal
          flat
          mask="YYYY-MM-DD HH:mm"
          @update:model-value="selectionStep = 'hour'"
        />
        <div v-else-if="selectionStep === 'hour'" class="text-black row">
          <div class="row q-pa-md">
            <q-item
              dense
              class="item-size col-3"
              v-for="hour in DAY_HOURS"
              :key="hour"
              clickable
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
              class="item-size col-6"
              v-for="(minute, index) in minutes"
              :key="index"
              clickable
              @click="finishSelector(minute)"
            >
              {{ DateTime.fromMillis(minute).toFormat("HH:mm") }}
            </q-item>
          </div>
        </div>
      </div>
    </template>
  </q-select>
</template>
