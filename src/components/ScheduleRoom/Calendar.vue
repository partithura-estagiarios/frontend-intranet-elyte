<script setup lang="ts">
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";
import { Event, Room } from "../../entities";
import GetEvent from "../../graphql/events/GetEvents.gql";
import GetRooms from "../../graphql/rooms/GetRooms.gql";
import { DateTime } from "luxon";

const calendar = ref();
const selectedDate = ref(today());
const activedModal = ref(false);
const eventList = ref();
const roomList = ref();
const selectedEvent = {};

onMounted(() => {
  getEvents();
  getRooms();
});

async function getRooms(): Promise<void> {
  roomList.value = await runQuery(GetRooms).then((data) => data.room);
}

async function getEvents(): Promise<void> {
  eventList.value = await runQuery(GetEvent).then((data) => data.event);
  console.log(eventList.value);
}
function getRoomByEvent(event: Event): Pick<Room, "color"> {
  return roomList.value?.find((room: Room) => room.id == +event.roomId) as Room;
}

function addEvent(eventList: Array<Event | any>, event: Event): void {
  eventList.push(event);
}

const joinDate = computed(() => {
  if (eventList.value) {
    return eventList.value.reduce((acc: Record<string, any>, event: Event) => {
      const initialDateTime = DateTime.fromMillis(event.initialTime as number);
      const finalDateTime = DateTime.fromMillis(event.finalTime as number);
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
      @reload="() => onReload"
      :rooms="roomList"
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
            <q-icon name="circle" :color="getRoomByEvent(event)?.color" />
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
        v-for="room in roomList"
        :key="room.name"
      >
        <q-icon name="circle" />
        {{ $t("label.room") + " " + room.name }}
      </span>
    </div>
  </div>
</template>
