<script setup lang="ts">
const weekday = [
  t("text.days.sunday"),
  t("text.days.monday"),
  t("text.days.tuesday"),
  t("text.days.wednesday"),
  t("text.days.thursday"),
  t("text.days.friday"),
  t("text.days.saturday"),
];

const menuItems = [
  { field: "rice" },
  { field: "salad" },
  { field: "soup" },
  { field: "complement" },
  { field: "protein" },
  { field: "dessert" },
];

const menus = ref<Array<Menu>>([
  {
    date: "2023-08-15",
    rice: "ARROZ",
    salad: "SALADA",
    soup: "SOPA",
    complement: "BATATA",
    protein: "FRANGO",
    dessert: "MAÇA",
  },
  {
    date: "2023-08-16",
    rice: "ARROZ",
    salad: "SALADA",
    soup: "SOPA",
    complement: "FRANGO",
    protein: "FRANGO",
    dessert: "MAÇA",
  },
  {
    date: "2023-08-17",
    rice: "ARROZ",
    salad: "SALADA",
    soup: "SOPA",
    complement: "FRANGO",
    protein: "FRANGO",
    dessert: "MAÇA",
  },
  {
    date: "2023-08-18",
    rice: "ARROZ",
    salad: "SALADA",
    soup: "SOPA",
    complement: "FRANGO",
    protein: "FRANGO",
    dessert: "MAÇA",
  },
  {
    date: "2023-08-19",
    rice: "ARROZ",
    salad: "SALADA",
    soup: "SOPA",
    complement: "FRANGO",
    protein: "FRANGO",
    dessert: "MAÇA",
  },
  {
    date: "2023-08-20",
    rice: "ARROZ",
    salad: "SALADA",
    soup: "SOPA",
    complement: "FRANGO",
    protein: "FRANGO",
    dessert: "MAÇA",
  },
]);

const datesInMilliseconds = ref<Array<number>>([]);
menus.value.forEach((element) => {
  const date = new Date(element.date).getTime();
  datesInMilliseconds.value.push(date);
});

const maiorData = Math.max(...datesInMilliseconds.value);
const menorData = Math.min(...datesInMilliseconds.value);

const getDayWeek = function (day: string) {
  const date = new Date(day);
  return weekday[date.getDay()];
};

const formatDate = (dateValue: number) => {
  const date = new Date(dateValue);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
</script>

<template>
  <q-img src="/menu2jpg" class="opacity fixed-full" />
  <div>
    <div class="row justify-between">
      <BackButton class="row q-ml-md hide-print q-mt-md" />
      <span class="text-white text-h4 relative-position text-bold">
        {{ $t("titles.menu") }} ( {{ formatDate(menorData) }} a
        {{ formatDate(maiorData) }} )
      </span>
      <PrintButton class="q-mr-md" />
    </div>

    <div class="row justify-center">
      <q-card
        class="text-uppercase col-3 q-ma-md border"
        v-for="(menu, index) in menus"
        :key="index"
      >
        <q-card-section class="bg-primary">
          <span class="text-subtitle2 text-white text-weight-bold">
            {{ getDayWeek(menu.date) }}
          </span>
        </q-card-section>
        <q-card-section class="text-subtitle2 text-black">
          <div v-for="item in menuItems" :key="item.field" class="row">
            <q-icon class="col-5 row" :name="item.icon" color="primary" />
            <p>{{ menu[item.field] }}</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.opacity {
  filter: brightness(50%);
}
.border {
  border-radius: 16px;
}

@media print {
  .hide-print {
    display: none !important;
  }
}
</style>
