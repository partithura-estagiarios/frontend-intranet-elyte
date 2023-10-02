<script setup lang="ts">
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";
import { Event, Room } from "../../entities";
import GetEvents from "../../graphql/events/GetEvents.gql";
import GetRooms from "../../graphql/rooms/GetRooms.gql";
import { DateTime } from "luxon";

const calendar = ref();
const selectedDate = ref(today());
const activedModal = ref(false);
const eventList = ref();
const roomList = ref();
const selectedEvent = {};
const currentDay = DateTime.fromISO(today()).toFormat("yyyy-MM-dd");

onMounted(() => {
  getEvents();
  getRooms();
});

async function getRooms(): Promise<void> {
  roomList.value = await runQuery(GetRooms).then((data) => data.room);
}

async function getEvents(): Promise<void> {
  eventList.value = await runQuery(GetEvents).then((data) => data.event);
}

function getRoomByEvent(event: Event): Pick<Room, "color"> {
  return roomList.value?.find((room: Room) => room.id == +event.roomId) as Room;
}

const joinDates = computed(() => {
  if (eventList.value) {
    const joinedDatesResult = eventList.value.reduce(
      (acc: Record<string, Event[]>, event: Event) => {
        const initialDateTime = DateTime.fromMillis(
          event.initialTime as number
        );
        const finalDateTime = DateTime.fromMillis(event.finalTime as number);

        const numberOfDays =
          finalDateTime.diff(initialDateTime, "days").days + 1;
        const dateRange = Array.from({ length: numberOfDays }, (_, index) =>
          initialDateTime.plus({ days: index })
        );
        dateRange.forEach((dt) => {
          const currentDate = dt.toISODate();
          if (currentDate) {
            acc[currentDate] = [...(acc[currentDate] || []), event];
          }
        });
        return acc;
      },
      {}
    );
    return joinedDatesResult;
  }
});

function parsedScheduleDate(date: number) {
  return DateTime.fromMillis(date).toFormat("HH:mm");
}

function onPrev() {
  calendar.value.prev();
}
function onNext() {
  calendar.value.next();
}
function onReload() {
  getEvents();
}
</script>

<template>
  <ScheduleModal
    :isActive="activedModal"
    @cancel="activedModal = false"
    :item="selectedEvent"
  />
  <div class="row q-px-xl">
    <div class="column items-start text-black q-gutter-y-md q-pa-xl col-9">
      <ScheduleNavigation
        :date="selectedDate"
        @prev="onPrev"
        @next="onNext"
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
      >
        <template #day="{ scope: { timestamp } }">
          <div class="row full-height items-end q-gutter-x-xs">
            <div
              class="row items-end no-padding cursor-pointer"
              v-if="joinDates && joinDates[timestamp.date]"
              v-for="(event, index) in joinDates[timestamp.date]"
              :key="index"
              @click="
                activedModal = true;
                selectedEvent = event;
              "
            >
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
    <div class="grow q-py-xl">
      <q-card bordered class="text-white">
        <q-card-section class="bg-primary">
          <div class="text-h4">{{ $t("label.dayEvents") }}</div>
        </q-card-section>
        <q-card-section class="row q-gutter-x-lg justify-center items-center">
          <div class="text-h6 text-black">
            {{ DateTime.now().setLocale("pt-br").weekdayLong }}
          </div>
          <div class="text-h2 text-black">{{ DateTime.now().day }}</div>
          <div class="text-h6 text-black">
            {{ DateTime.now().setLocale("pt-br").monthLong }}
          </div>
        </q-card-section>

        <div
          v-if="eventList"
          class="text-h6 text-black row q-pa-md items-start q-gutter-x-sm"
          v-for="(event, index) in joinDates[currentDay]"
          :key="index"
        >
          <div class="row q-gutter-x-sm">
            <q-icon
              class="q-py-sm"
              name="circle"
              :color="getRoomByEvent(event)?.color"
            />
            <q-item class="column items-start no-padding">
              <span> {{ event.userCreated }} - {{ event.description }} </span>
              <span class="text-secondary"
                >{{ parsedScheduleDate(event.initialTime) }} -
                {{ parsedScheduleDate(event.finalTime) }}</span
              >
            </q-item>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<style>
.q-calendar-month__day {
  border: transparent;
}
.q-calendar__button {
  font-size: 30px;
}
:root {
  --calendar-border: none;
}
</style>
