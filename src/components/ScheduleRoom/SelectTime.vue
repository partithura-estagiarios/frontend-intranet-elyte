<script setup lang="ts">
import { Event } from "../../entities";
import GetEventTime from "../../graphql/events/GetEventTime.gql";
import { DateTime } from "luxon";

const emits = defineEmits(["setTime"]);

const time = ref(null);
const date = ref(null);
const openTime = ref(false);
const openMinute = ref(false);
const eventsByDay = ref([]);
const availableMinutes = ref<number[]>([]);
const dayHours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const minutes = ref<Array<number>>([]);

watch(date, async () => {
  const parseDate = DateTime.fromJSDate(
    new Date(date.value as unknown as Date)
  ).toMillis();

  const response = await runQuery(GetEventTime, {
    day: parseDate,
    roomId: "1",
  });
  eventsByDay.value = response.getEventTime;
});

function hourIsDisabled(hour: number) {
  const foundHour = eventsByDay.value.find((event) => event.hour === hour);
  if (foundHour) {
    return !(foundHour.initial.available || foundHour.half.available);
  }
  return true;
}

function minuteIsDisabled(minute: number) {
  return !availableMinutes.value.includes(DateTime.fromMillis(minute).minute);
}

function getMinutesAvailable(selectedHour: number) {
  availableMinutes.value = []; // Limpa a matriz antes de adicionar novos minutos

  const foundHour = eventsByDay.value.find(
    (event) => event.hour === selectedHour
  );
  if (foundHour?.initial.available) {
    availableMinutes.value.push(0);
  }
  if (foundHour?.half.available) {
    availableMinutes.value.push(30);
  }
}

function generateTimeList(selectedHour: number): void {
  const times = [];
  getMinutesAvailable(selectedHour);

  const hour = new Date(date.value as unknown as number);
  hour.setHours(selectedHour);
  const hoursPlus30 = new Date(hour);
  hoursPlus30.setMinutes(30);
  times.push(hour.getTime(), hoursPlus30.getTime());

  minutes.value = times;
  console.log(minutes.value);
  openMinute.value = true;
}

function finishSelector(minute: number) {
  emits("setTime", minute);
  openMinute.value = false;
  openTime.value = false;
}
</script>

<template>
  <q-select
    class="col-6 q-px-xs row select"
    :label="$t('label.date.initial')"
    v-model="time"
    ref="initialSelect"
  >
    <template #no-option>
      <div class="row justify-center date-menu">
        <q-date
          v-if="!openTime"
          class="text-black"
          v-model="date"
          minimal
          flat
          mask="YYYY-MM-DD HH:mm"
          @update:model-value="openTime = true"
        />
        <div v-else class="text-black row">
          <div class="row q-pa-md">
            <q-item
              v-if="!openMinute"
              dense
              class="item-size col-3"
              v-for="hour in dayHours"
              :key="hour"
              clickable
              :disable="hourIsDisabled(hour)"
              :class="{ 'q-item-disable': hourIsDisabled(hour) }"
              @click="generateTimeList(hour)"
            >
              {{ DateTime.fromObject({ hour }).toFormat("HH:mm") }}
            </q-item>
            <q-item
              v-else
              dense
              class="item-size col-6"
              v-for="minute in minutes"
              clickable
              @click="finishSelector(minute)"
              :disable="minuteIsDisabled(minute)"
              :class="{ 'q-item-disable': minuteIsDisabled(minute) }"
            >
              {{ DateTime.fromMillis(minute).toFormat("HH:mm") }}
            </q-item>
          </div>
        </div>
      </div>
    </template>
  </q-select>
</template>
