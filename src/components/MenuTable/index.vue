<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { Menu } from "../../entities";

onMounted(() => {
  getMenu();
});

const menus = ref<Menu[]>([]);

const weekday = [
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

async function getMenu() {
  const { getMenu: rawData } = await runQuery(GetMenu);

  if (Array.isArray(rawData)) {
    menus.value = rawData.map((item: any) => {
      return {
        ...item,
        date: new Date(parseInt(item.date)),
      };
    });
  }
}

const groupMenusByDate = () => {
  const groupedMenus: Record<string, Menu[]> = {};

  menus.value.forEach((menu) => {
    const date = menu.date.toISOString().split("T")[0];
    const dayOfWeekIndex = new Date(date).getDay();
    const dayOfWeek = weekday[dayOfWeekIndex];

    if (!groupedMenus[date]) {
      groupedMenus[date] = [];
    }
    groupedMenus[date].push({ ...menu, dayOfWeek });
  });

  return groupedMenus;
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
      <PrintButton class="q-mr-md" />
    </div>

    <div class="row justify-center">
      <template
        v-for="(dayMenus, dayOfWeek) in groupMenusByDate()"
        :key="dayOfWeek"
      >
        <q-card class="text-uppercase col-3 q-ma-md border">
          <q-card-section class="bg-primary">
            <div v-for="menu in dayMenus" :key="menu.DATE">
              <div>
                {{ menu.dayOfWeek }}
              </div>
            </div>
          </q-card-section>
          <q-card-section class="text-subtitle2 text-black">
            <div v-for="menu in dayMenus" :key="menu.DATE">
              <div v-for="item in menuItems" :key="item.field" class="column">
                {{ item.field }}
                <p>{{ menu[item.field] }}</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </template>
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
