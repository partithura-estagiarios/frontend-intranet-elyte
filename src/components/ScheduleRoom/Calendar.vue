<script setup lang="ts">
import { DateTime } from "luxon";
import { Event, Room } from "../../entities";
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";

import GetEvents from "../../graphql/events/GetEvents.gql";
import GetRooms from "../../graphql/rooms/GetRooms.gql";

const calendar = ref();
const roomList = ref();
const eventList = ref();
const selectedEvent = {};
const activedModal = ref(false);
const selectedDate = ref(today());
const currentDay = DateTime.fromISO(today()).toFormat("yyyy-MM-dd");

onMounted(() => {
  getEvents();
  getRooms();
});

async function getRooms(): Promise<void> {
  roomList.value = await runQuery(GetRooms).then((data) => data.getRooms);
}

async function getEvents(): Promise<void> {
  eventList.value = await runQuery(GetEvents).then((data) => data.getEvents);
}

function getRoomByEvent(event: Event) {
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
        dateRange.forEach((dateTime) => {
          const currentDate = dateTime.toISODate();
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
  <!-- TODO: componentizar esse grande componente -->
  <ScheduleModal
    :isActive="activedModal"
    @cancel="activedModal = false"
    :item="selectedEvent"
  />
  <div class="row q-px-xl">
    <div class="q-gutter-y-md q-pa-xl col-9">
      <ScheduleNavigation
        :rooms="roomList"
        :date="selectedDate"
        @prev="onPrev"
        @next="onNext"
        @reload="() => onReload"
      />
      <q-calendar-month
        animated
        ref="calendar"
        locale="pt-br"
        use-navigation
        :focus-type="['day']"
        :day-min-height="100"
        v-model="selectedDate"
      >
        <template #day="{ scope: { timestamp } }">
          <div class="full-height q-gutter-x-xs">
            <div
              class="row items-end no-padding cursor-pointer"
              v-if="joinDates"
              v-for="(event, index) in joinDates[timestamp.date]"
              :key="index"
              @click="
                activedModal = true;
                selectedEvent = event;
              "
            >
              <q-icon name="circle" :color="getRoomByEvent(event)?.color" />
              <q-tooltip class="bg-black text-bold">
                {{ event.userCreated }}
              </q-tooltip>
            </div>
          </div>
        </template>
      </q-calendar-month>

      <div class="row q-gutter-md text-body1">
        <span
          :class="`text-${room.color}`"
          v-for="room in roomList"
          :key="room.id"
        >
          <q-icon name="circle" />
          {{ $t("label.room") + " " + room.name }}
        </span>
      </div>
    </div>
    <div class="grow q-py-xl">
      <q-card bordered class="text-black text-h6">
        <q-card-section class="bg-primary">
          <div class="text-h4 text-white">{{ $t("label.dayEvents") }}</div>
        </q-card-section>
        <q-card-section class="row q-gutter-x-lg justify-center items-center">
          <div>
            {{ DateTime.now().setLocale("pt-br").weekdayLong }}
          </div>
          <div class="text-h2">{{ DateTime.now().day }}</div>
          <div>
            {{ DateTime.now().setLocale("pt-br").monthLong }}
          </div>
        </q-card-section>

        <div
          class="row q-pa-md items-start q-gutter-x-sm"
          v-for="(events, index) in joinDates[currentDay]"
          :key="index"
          v-if="eventList"
        >
          <div class="row q-gutter-x-sm">
            <q-icon
              class="q-py-sm"
              name="circle"
              :color="getRoomByEvent(events)?.color"
            />
            <q-item class="column items-start no-padding">
              <span> {{ events.userCreated }} - {{ events.description }} </span>
              <span class="text-secondary">
                {{ parsedScheduleDate(events.initialTime) }} -
                {{ parsedScheduleDate(events.finalTime) }}
              </span>
            </q-item>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>