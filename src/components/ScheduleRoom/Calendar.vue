<script setup lang="ts">
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";
import { Event, Room } from "../../entities";
import GetEvent from "../../graphql/events/getEvents.gql";
import { DateTime } from "luxon";

const calendar = ref();
const selectedDate = ref(today());
const activedModal = ref(false);
const eventList = ref();
const selectedEvent = {};

onMounted(() => {
  getEvents();
});
// Dados de sala mockados
const rooms = [
  { id: 1, name: "A", color: "blue-5" },
  { id: 2, name: "B", color: "green-9" },
];

function getRoomByEvent(event: Event): Pick<Room, "color"> {
  return rooms.find((room) => room.id === +event.roomId) as Room;
}

function addEvent(eventList: Array<Event | any>, event: Event): void {
  eventList.push(event);
}

async function getEvents(): Promise<void> {
  eventList.value = await runQuery(GetEvent).then((data) => data.event);
}

const joinDate = computed(() => {
  if (eventList.value) {
    return eventList.value.reduce((acc: Record<string, any>, event: Event) => {
      const initialDateTime = DateTime.fromMillis(event.initialTime);
      const finalDateTime = DateTime.fromMillis(event.finalTime);
      for (
        let dt = initialDateTime;
        dt <= finalDateTime;
        dt = dt.plus({ days: 1 })
      ) {
        const currentDate = dt.toISODate();
        if (currentDate) {
          if (!acc[currentDate]) {
            acc[currentDate] = [];
          }
          addEvent(acc[currentDate], event);
        }
      }
      return acc;
    }, {});
  }
});

function onPrev() {
  calendar.value.prev();
}
function onNext() {
  calendar.value.next();
}
function onToday() {
  calendar.value.moveToToday();
}
function onReload() {
  getEvents();
}
</script>

<template>
  <div class="column items-start text-black q-gutter-y-md q-pa-xl">
    {{ selectedDate }}
    <ScheduleNavigation
      @prev="onPrev"
      @next="onNext"
      @today="onToday"
      @reload="onReload"
    />
    <q-calendar-month
      ref="calendar"
      v-model="selectedDate"
      use-navigation
      locale="pt-br"
      :focus-type="['day']"
      :day-min-height="100"
      animated
      bordered
    >
      <template #day="{ scope: { timestamp } }">
        <div class="row full-height items-end q-gutter-x-xs">
          <div
            class="row items-end no-padding cursor-pointer"
            v-for="(event, index) in joinDate[timestamp.date]"
            :key="index"
            @click="
              activedModal = true;
              selectedEvent = event;
            "
          >
            <ScheduleModal
              :isActive="activedModal"
              @cancel="activedModal = false"
              :item="selectedEvent"
            />
            <q-icon name="circle" :color="getRoomByEvent(event).color" />
            <q-tooltip class="bg-black text-bold">{{
              event.userCreated
            }}</q-tooltip>
          </div>
        </div>
      </template>
    </q-calendar-month>

    <div class="row q-gutter-md text-body1">
      <span
        :class="`text-${room.color}`"
        v-for="room in rooms"
        :key="room.name"
      >
        <q-icon name="circle" />
        {{ $t("label.room") + " " + room.name }}
      </span>
    </div>
  </div>
</template>
