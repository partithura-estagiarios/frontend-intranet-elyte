<script setup lang="ts">
defineProps({
  rooms: {
    type: Array,
    required: true,
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

  <div class="row justify-between fit">
    <div class="row q-pa-md q-gutter-sm text-black">
      <q-btn-group>
        <q-btn no-caps @click="$emit('prev')" :label="$t('label.previous')" />
        <q-btn
          no-caps
          @click="$emit('today')"
          :label="$t('label.date.today')"
        />
        <q-btn no-caps @click="$emit('next')" :label="$t('label.next')" />
      </q-btn-group>

      <q-btn-group>
        <q-btn no-caps :label="t('label.date.year')" />
        <q-btn no-caps :label="t('label.date.month')" />
        <q-btn no-caps :label="t('label.date.week')" />
        <q-btn no-caps :label="t('label.date.day')" />
      </q-btn-group>
    </div>

    <div class="column justify-center">
      <q-btn
        no-caps
        :label="$t('action.scheduleEvent')"
        @click="activedModal = true"
      />
    </div>
  </div>
</template>
