<script setup lang="ts">
const emits = defineEmits(["reload", "prev", "next", "select-month"]);

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
  dropdownLabel: {
    type: String,
    default: "",
  },
  months: {
    type: Array,
    default: () => [],
  },
});

const months = ref(props.months);

function selectMonth(month: number) {
  emits("select-month", month);
}

const activedModal = ref(false);

function reload() {
  activedModal.value = false;
  emits("reload");
}
</script>

<template>
  <AddSchedule
    :is-active="activedModal"
    :rooms="rooms"
    @cancel="activedModal = false"
    @reload="reload"
  />

  <div class="row justify-between q-mx-lg">
    <div class="column q-pa-md">
      <q-btn-group class="row justify-center q-px-xs">
        <NavigationButton icon="arrow_left" @click="$emit('prev')" />
        <q-btn-dropdown
          transition-show="scale"
          transition-hide="scale"
          no-caps
          text-color="primary"
          class="text-h6 q-ml-lg"
          dropdown-icon="false"
          :label="dropdownLabel"
        >
          <q-list v-for="(month, index) in months" :key="index">
            <q-item
              clickable
              v-close-popup
              @click="selectMonth(month.value)"
              class="text-black text-h6"
              v-model="month.value"
            >
              <q-item-section>
                <q-item-label>{{ month.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <NavigationButton icon="arrow_right" @click="$emit('next')" />
      </q-btn-group>
    </div>
    <!-- TODO esses botões vão ganhar funcionalidades futuramente
    <div class="row q-py-md col-4">
      <q-btn-group class="rounded col-10">
        <NavigationButton class="col-4" :label="t('label.date.month')" />
        <NavigationButton class="col-4" :label="t('label.date.week')" />
        <NavigationButton class="col-4" :label="t('label.date.day')" />
      </q-btn-group>
    </div> -->

    <div class="column justify-center col-2">
      <q-btn
        class="full-width text-h6 col-7 text-primary rounded"
        no-caps
        :label="$t('action.scheduleEvent')"
        @click="activedModal = true"
      />
    </div>
  </div>
</template>

<style scoped>
.schedule-item-border {
  border: 1px solid #ff0321;
  border-radius: 5px;
}
</style>
