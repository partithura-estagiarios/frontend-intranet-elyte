<template>
  <div class="bg-grey-7 q-mb-xl cardapio">
    <div class="row justify-between">
      <BackButton class="row q-ml-md q-mt-md hide-print" />
      <span class="text-h3 q-mt-md">{{ t("titles.menu") }}</span>
      <PrintButton />
    </div>
    <q-item class="row justify-center">
      <span class="text-h6 q-mr-xl">
        {{ generateDateForm(menorData) }} a
        {{ generateDateForm(maiorData) }}</span
      >
    </q-item>
    <div class="row">
      <q-card
        class="bg-grey-9 card-size q-ma-lg text-uppercase col-2"
        v-for="menu in menus"
      >
        <q-card-section>
          <div class="text-h6">{{ getDayWeek(menu.date) }}</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>{{ menu.rice }} </q-card-section>
        <q-card-section>{{ menu.salad }} </q-card-section>
        <q-card-section>{{ menu.complement }} </q-card-section>
        <q-card-section>{{ menu.protein }} </q-card-section>
        <q-card-section>{{ menu.soup }} </q-card-section>
        <q-card-section>{{ menu.dessert }} </q-card-section>
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
.cardapio {
  height: 100%;
}

@media print {
  .cardapio {
    color: white;
  }
}
</style>
