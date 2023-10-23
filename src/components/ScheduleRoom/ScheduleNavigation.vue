<script setup lang="ts">
import { DateTime } from "luxon";

defineEmits(["reload", "prev", "next"]);

const props = defineProps({
  rooms: {
    type: Array,
    required: true,
    default: () => [],
  },
  date: {
    type: String,
    required: true,
    default: "",
  },
});

const months = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const year = ref(
  DateTime.fromFormat(props.date, "yyyy-MM-dd").setLocale("pt-br").year
);

const month = ref(
  DateTime.fromFormat(props.date, "yyyy-MM-dd").setLocale("pt-br").monthLong
);

const activedModal = ref(false);
</script>

<template>
  <AddSchedule
    :is-active="activedModal"
    :rooms="rooms"
    @cancel="activedModal = false"
    @reload="$emit('reload', (activedModal = false))"
  />

  <div class="row justify-between full-width">
    <div class="column q-pa-md text-white col-2">
      <span class="text-black text-h4 q-ma-xs">
        {{ year }}
      </span>
      <q-btn no-caps flat class="bg-primary text-h6" :label="month">
        <NavigationButton icon="arrow_left" @click="$emit('prev')" />
        <q-menu auto-close transition-show="scale" transition-hide="scale">
          <q-list v-for="(month, index) in months" :key="index">
            <q-item clickable v-close-popup>
              <q-item-section class="text-black text-subtitle1">
                {{ month }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <NavigationButton icon="arrow_right" @click="$emit('next')" />
      </q-btn>
    </div>

    <div class="row q-py-md text-black col-4">
      <q-btn-group class="rounded col-12">
        <NavigationButton class="col-4" :label="t('label.date.month')" />
        <NavigationButton class="col-4" :label="t('label.date.week')" />
        <NavigationButton class="col-4" :label="t('label.date.day')" />
      </q-btn-group>
    </div>

    <div class="column justify-center col-2">
      <q-btn
        class="full-width text-h6 col-6 bg-primary rounded"
        no-caps
        :label="$t('action.scheduleEvent')"
        @click="activedModal = true"
      />
    </div>
  </div>
</template>
