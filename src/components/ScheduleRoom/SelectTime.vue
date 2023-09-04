<script setup lang="ts">
import { EventTimes } from "../../entities";
import GetEventTime from "../../graphql/events/GetEventTime.gql";
import { DateTime } from "luxon";

const emits = defineEmits(["setTime"]);
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
});

const time = ref(null);
const date = ref(null);
const selectionStep = ref<"date" | "hour" | "minute" | null>(null);
const eventsByDay = ref<EventTimes[]>([]);
const availableMinutes = ref<Array<number>>([]);
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

function hourIsDisabled(hour: number): boolean {
  const foundHour = eventsByDay.value.find(
    (event: EventTimes) => event.hour === hour
  ) as unknown as EventTimes;
  if (foundHour) {
    return !(foundHour.initial.available || foundHour.half.available);
  }
  return true;
}

function minuteIsDisabled(minute: number): boolean {
  if (props.type === "initial") {
    return !availableMinutes.value.includes(DateTime.fromMillis(minute).minute);
  }
  return false;
}

function getMinutesAvailable(selectedHour: number): void {
  availableMinutes.value = [];

  const foundHour = eventsByDay.value.find(
    (event: EventTimes) => event.hour === selectedHour
  ) as unknown as EventTimes;
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
  selectionStep.value = "minute";
}

function finishSelector(minute: number) {
  emits("setTime", minute);
  date.value = null;
  selectionStep.value = null;
}
</script>

<template>
  <q-select
    class="col-6 q-px-xs row select"
    v-model="time"
    ref="initialSelect"
    @popup-show="selectionStep = 'date'"
  >
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
              v-for="hour in dayHours"
              :key="hour"
              clickable
              :disable="hourIsDisabled(hour)"
              :class="{ 'q-item-disable': hourIsDisabled(hour) }"
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
