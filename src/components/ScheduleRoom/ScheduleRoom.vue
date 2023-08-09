<script setup lang="ts">
import {
  QCalendarMonth,
  today,
} from "@quasar/quasar-ui-qcalendar/src/index.js";

// const calendar = ref(null)
// const selectedDate = ref('')

function onPrev(cal) {
  console.log(cal);
  cal.prev();
}
// function onNext() {
//   console.log(calendar.value.prev)
//   calendar.value.next()
// }
</script>

<template>
  <div class="column justify-center text-black">
    {{ calendar }}
    {{ selectedDate }}
    <ScheduleNavigation @today="onToday" @prev="onPrev" @next="onNext" />
    <q-calendar-month
      ref="calendar"
      v-model="selectedDate"
      use-navigation
      :focus-type="['day']"
      :day-min-height="100"
      animated
      bordered
      @click="onPrev(this.$refs.calendar)"
    />
  </div>
</template>
