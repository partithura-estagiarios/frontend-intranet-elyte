<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { Menu } from "../../entities";
import { ref, onMounted } from "vue";

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

const TIME_SEPARATOR = "T";

const groupMenusByDate = () => {
  const groupedMenus: Record<string, Menu[]> = {};
  menus.value.forEach((menu) => {
    const date = menu.date.toISOString().split(TIME_SEPARATOR)[0];
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

async function getMenu() {
  const { getMenu: rawData } = await runQuery(GetMenu);
  if (Array.isArray(rawData)) {
    rawData.sort((a, b) => a.date - b.date);
    const last7Menus = rawData.slice(0, 7);

    menus.value = last7Menus.map((item: Menu) => {
      return {
        ...item,
        date: new Date(parseInt(item.date)),
      } as unknown as Menu;
    });
  }
}
</script>

<template>
  <div>
    <q-img src="/menu2jpg" class="absolute opacity fixed-full" />
    <div class="row justify-center">
      <span class="text-white font text-bold q-ml-lg relative">
        {{ $t("titles.Hr.Menu") }}
        <q-separator size="0.5rem" color="primary" class="bar-style" />
      </span>
    </div>
    <div class="row justify-between">
      <BackButton class="row q-ml-md hide-print q-mt-md no-print" />
      <PrintButton class="q-mr-md no-print" />
    </div>

    <div class="row justify-center no-print">
      <div class="col">
        <div class="row">
          <template v-for="dayMenus in groupMenusByDate()" :key="dayOfWeek">
            <div class="col-4">
              <q-card
                class="text-uppercase col q-ma-md border smaller-card mx-auto text-white"
              >
                <q-card-section class="bg-primary">
                  <div>
                    {{ dayMenus[0].dayOfWeek }}
                  </div>
                </q-card-section>
                <q-card-section class="text-subtitle2 text-black">
                  <div v-for="menu in dayMenus" :key="menu.DATE">
                    <div
                      v-for="item in menuItems"
                      :key="item.field"
                      class="menu-item"
                    >
                      <q-icon name="restaurant" class="menu-icon" />
                      <p class="menu-text">{{ menu[item.field] }}</p>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </div>
      </div>
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
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}

@page {
  margin: 0 !important;
  padding: 0 !important;
  size: landscape;
}
.font {
  font-size: 1.6rem;
}
.bar-style {
  border-radius: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
}

.menu-icon {
  margin-right: 8px;
}

.menu-text {
  margin-left: 8px;
}

.smaller-card {
  max-width: 300px;
  margin: 10px auto;
}
</style>
