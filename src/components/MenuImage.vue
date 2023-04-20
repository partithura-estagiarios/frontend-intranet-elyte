<template>
  <q-img
    src="/images/bg0.jpg"
    no-spinner
    no-transition
    class="opacity fixed-full"
  />
  <div>
    <div class="row justify-between">
      <BackButton class="row q-ml-md hide-print q-mt-md" />
      <span class="text-white text-h5 relative-position q-mt-md"
        >{{ $t("titles.menu") }} ( {{ generateDateForm(menorData) }} a
        {{ generateDateForm(maiorData) }} )</span
      >
      <PrintButton class="q-mr-md" />
    </div>

    <div class="row justify-center">
      <q-card
        class="text-uppercase col-3 q-mt-md q-mx-md border"
        v-for="menu in menus"
      >
        <q-card-section class="bg-primary">
          <span class="text-subtitle2 text-white text-weight-bold">{{
            getDayWeek(menu.date)
          }}</span>
        </q-card-section>
        <q-card-section class="text-subtitle2 text-black">
          <q-card-item class="row">
            <q-icon class="col-5 row" name="circle" color="primary" />
            <p>{{ menu.rice }}</p>
          </q-card-item>
          <q-card-item class="row">
            <q-icon name="circle" color="primary" class="row col-5" />
            <p>{{ menu.salad }}</p>
          </q-card-item>
          <q-card-item class="row">
            <q-icon class="row col-5" name="circle" color="primary" />
            <p>{{ menu.soup }}</p>
          </q-card-item>
          <q-card-item class="row">
            <q-icon class="row col-5" name="circle" color="primary" />
            <p>{{ menu.complement }}</p>
          </q-card-item>
          <q-card-item class="row">
            <q-icon class="col-5 row" name="circle" color="primary" />
            <p>{{ menu.protein }}</p>
          </q-card-item>
          <q-card-item class="row">
            <q-icon class="col-5 row" name="circle" color="primary" />
            <p>{{ menu.dessert }}</p>
          </q-card-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { Menu } from "../entities";

const weekday = [
  t("text.days.sunday"),
  t("text.days.monday"),
  t("text.days.tuesday"),
  t("text.days.wednesday"),
  t("text.days.thursday"),
  t("text.days.friday"),
  t("text.days.saturday"),
];

const menus = menusStorage.getMenus as unknown as Menu[];

const dates: Ref<Array<Date>> = ref([]);
const datas: Ref<Array<number>> = ref([]);

menus.forEach((element) => {
  const date = generateDate(element.date);
  dates.value.push(date);
});

dates.value.forEach((element) => {
  datas.value.push(element.getTime());
});

const maiorData = Math.max(...datas.value);
const menorData = Math.min(...datas.value);

const getDayWeek = function (day: string) {
  const date = generateDate(day);
  return weekday[date.getDay()];
};
</script>

<style scoped>
.opacity {
  filter: brightness(50%);
}

.border {
  border-radius: 16px;
}
</style>
