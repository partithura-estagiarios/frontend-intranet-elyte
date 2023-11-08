<script setup lang="ts">
import type { Event, Room } from "../../entities/Event";
import { DateTime } from "luxon";
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";

import GetRooms from "../../graphql/rooms/GetRooms.gql";
import GetEvents from "../../graphql/events/GetEvents.gql";

const calendar = ref();
const roomList = ref();
const eventList = ref();
const selectedEvent = ref({});
const activedModal = ref(false);
const selectedDate = ref(today());
const currentDay = ref(DateTime.fromISO(today()).toFormat("yyyy-MM-dd"));

onMounted(() => {
  getRooms();
  getEvents();
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

const joinedDates = computed(() => {
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

function parseScheduleDate(date: number) {
  return DateTime.fromMillis(date).toFormat("HH:mm");
}

function onPrev() {
  calendar.value.prev();
}

function onNext() {
  calendar.value.next();
}

function cancel() {
  activedModal.value = false;
}

const dateFormat = DateTime.now().setLocale("pt-br");

const day = ref(dateFormat.day);
const month = ref(dateFormat.monthLong);
const weekDay = ref(dateFormat.weekdayLong);

const monthLabel = ref(month.value);

function parseWeekDay(weekday: number) {
  return dateFormat.set({ weekday }).toFormat("cccc");
}

function parseMonth(month: number) {
  return dateFormat.set({ month }).toFormat("LLLL");
}

function changeMonth(month: number) {
  selectedDate.value = dateFormat.set({ month }).toFormat("yyyy-MM-dd");
  monthLabel.value = dateFormat.set({ month }).toFormat("LLLL");
}

function changeDayEvent(date: any) {
  const accessScope = date.scope;
  const accessTimestamp = accessScope.timestamp;

  if (currentDay.value != accessScope.activeDate) {
    currentDay.value = accessTimestamp.date;
    const dayValue = (day.value = accessTimestamp.day);
    const monthValue = (month.value = accessTimestamp.month);
    const weekDayValue = (weekDay.value = accessTimestamp.weekday);

    month.value = parseMonth(monthValue);
    weekDay.value = parseWeekDay(weekDayValue);
  }
}
</script>

<template>
  <!-- TODO: componentizar esse grande componente -->
  <ScheduleModal
    :isActive="activedModal"
    @cancel="cancel"
    :item="selectedEvent"
  />
  <div class="row q-px-xl">
    <div class="q-gutter-y-md q-pa-xl col-9">
      <ScheduleNavigation
        :rooms="roomList"
        :date="selectedDate"
        :month="monthLabel"
        @select-month="(month) => changeMonth(month)"
        @prev="onPrev"
        @next="onNext"
        @reload="getEvents"
      />
      <q-calendar-month
        animated
        ref="calendar"
        locale="pt-br"
        use-navigation
        :focus-type="['day']"
        :day-min-height="100"
        v-model="selectedDate"
        @click-date="changeDayEvent"
      >
        <template #day="{ scope: { timestamp } }">
          <div
            class="full-height q-gutter-x-xs test"
            v-if="joinedDates && joinedDates[timestamp.date]"
          >
            <div
              class="column no-padding cursor-pointer"
              v-for="(event, index) in joinedDates[timestamp.date]"
              :key="index"
              @click="
                activedModal = true;
                selectedEvent = event;
              "
            >
              <q-icon name="circle" :color="getRoomByEvent(event)?.color" />
              <q-tooltip class="bg-primary text-bold">
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
      <q-card class="text-black text-h6">
        <q-card-section class="bg-primary">
          <div class="text-h4 text-white">{{ $t("label.dayEvents") }}</div>
        </q-card-section>

        <q-card-section class="row q-gutter-x-lg justify-center items-center">
          <span>
            {{ weekDay }}
          </span>
          <span class="text-h2">{{ day }}</span>
          <span>
            {{ month }}
          </span>
        </q-card-section>
        <div v-if="eventList">
          <div
            class="row q-pa-md items-start q-gutter-x-sm"
            v-for="(events, index) in joinedDates[currentDay]"
            :key="index"
          >
            <div class="row q-gutter-x-sm">
              <q-icon
                class="q-py-sm"
                name="circle"
                :color="getRoomByEvent(events)?.color"
              />
              <q-item class="column items-start no-padding">
                <span>
                  {{ events.userCreated }} - {{ events.description }}
                </span>
                <span class="text-secondary">
                  {{ parseScheduleDate(events.initialTime) }} -
                  {{ parseScheduleDate(events.finalTime) }}
                </span>
              </q-item>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<style>
.q-calendar__button {
  font-size: 30px;
}
.q-calendar__ellipsis {
  font-size: larger;
}
.schedule-item-border {
  border: 1px solid #b33636;
  border-radius: 5px;
}
</style>
