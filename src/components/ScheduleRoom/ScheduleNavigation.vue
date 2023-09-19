<script setup lang="ts">
import { DateTime } from "luxon";

defineEmits(["reload", "prev", "next"]);
defineProps({
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
    <div class="row q-pa-md text-black col-2">
      <q-btn no-caps flat class="row bg-primary text-white button-border fit">
        <q-btn-group flat class="column">
          <q-btn
            class="no-padding"
            @click="$emit('prev')"
            dense
            icon="arrow_drop_up"
          />
          <q-btn
            class="no-padding"
            @click="$emit('next')"
            dense
            icon="arrow_drop_down"
          />
        </q-btn-group>
        <span class="text-h5">
          {{
            DateTime.fromFormat(date as string, "yyyy-MM-dd").setLocale("pt-br")
              .monthLong
          }}
        </span>
      </q-btn>
    </div>

    <div class="row q-py-md text-black col-4">
      <q-btn-group class="border-rounded col-12">
        <q-btn no-caps class="col-4" :label="t('label.date.month')" />
        <q-btn no-caps class="col-4" :label="t('label.date.week')" />
        <q-btn no-caps class="col-4" :label="t('label.date.day')" />
      </q-btn-group>
    </div>

    <div class="column justify-center col-2">
      <q-btn
        class="full-width text-h6 col-6 bg-primary text-white border-rounded"
        no-caps
        :label="$t('action.scheduleEvent')"
        @click="activedModal = true"
      />
    </div>
  </div>
</template>

<style scoped>
.button-border {
  border-radius: 0px 20px 0px 0px;
}
.border-rounded {
  border-radius: 10px;
}
</style>
