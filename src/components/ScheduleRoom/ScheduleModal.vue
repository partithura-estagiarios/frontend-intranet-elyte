<script setup lang="ts">
import { DateTime } from "luxon";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    required: true,
  },
});

const suports = computed(() => {
  return [
    {
      label: t("label.suport.computer"),
      icon: "computer",
      value: props.item.support["computer"],
    },
    {
      label: t("label.suport.projector"),
      icon: "mdi-projector",
      value: props.item.support["projector"],
    },
    {
      label: t("label.suport.water"),
      icon: "water_drop",
      value: props.item.support["water"],
    },
    {
      label: t("label.suport.coffee"),
      icon: "coffee",
      value: props.item.support["coffee"],
    },
  ];
});

function parseDate(date: number) {
  return DateTime.fromMillis(date).toFormat("dd/MM/yyyy HH:mm");
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    :open="isActive"
    :title="item.description"
    closeLabel="Fechar"
    close
  >
    <div class="column q-px-lg q-py-md text-black text-body1 q-gutter-md">
      <div class="row q-mt-md q-px-lg text-black">
        <q-list class="row justify-between q-gutter-md">
          <div class="row info-item-border col-5">
            <q-icon
              name="person"
              class="bg-primary q-pa-md"
              color="white"
              size="sm"
            />
            <q-item-label class="q-pa-md">{{ item.userCreated }}</q-item-label>
          </div>

          <div class="row info-item-border col-5">
            <q-icon
              name="mdi-card-account-details-outline"
              class="bg-primary q-pa-md"
              color="white"
              size="sm"
            />
            <q-item-label class="q-pa-md">{{
              item.userRegistration
            }}</q-item-label>
          </div>

          <div class="row info-item-border col-5">
            <q-icon
              name="mdi-phone-in-talk"
              class="bg-primary q-pa-md"
              color="white"
              size="sm"
            />
            <q-item-label class="q-pa-md">{{ item.ramalNumber }}</q-item-label>
          </div>

          <div class="row info-item-border col-5">
            <q-icon
              name="mdi-map-marker-radius"
              class="bg-primary q-pa-md"
              color="white"
              size="sm"
            />
            <q-item-label class="q-pa-md">{{ item.room.name }}</q-item-label>
          </div>

          <div class="row info-item-border col-5">
            <q-icon
              name="groups"
              class="bg-primary q-pa-md"
              color="white"
              size="sm"
            />
            <q-item-label class="q-pa-md">{{ item.totalPeople }}</q-item-label>
          </div>

          <div class="row info-item-border col-5">
            <q-icon
              name="email"
              class="bg-primary q-pa-md"
              color="white"
              size="sm"
            />
            <q-item-label class="q-pa-md">{{ item.email }}</q-item-label>
          </div>

          <div class="row info-item-border col-5">
            <q-icon
              name="mdi-calendar-clock"
              class="bg-primary q-pa-md"
              color="white"
              size="sm"
            />
            <q-item-label class="q-pa-md">{{
              parseDate(item.initialTime)
            }}</q-item-label>
          </div>

          <div class="row info-item-border col-5">
            <q-icon
              name="mdi-calendar-clock"
              class="bg-primary q-pa-md"
              color="white"
              size="sm"
            />
            <q-item-label class="q-pa-md">{{
              parseDate(item.finalTime)
            }}</q-item-label>
          </div>

          <div
            class="row info-item-border col-5"
            v-for="(suport, index) in suports"
            :key="index"
            v-show="suport.value"
          >
            <q-icon
              :name="suport.icon"
              class="bg-primary q-pa-md"
              color="white"
              size="sm"
            />
            <q-item-label class="q-pa-md">{{ suport.label }}</q-item-label>
          </div>
        </q-list>
      </div>
    </div>
  </DynamicDialog>
</template>

<style scoped>
.info-item-border {
  border: 1px solid #ff0321;
  border-radius: 5px;
}
</style>
