<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { Menu } from "../../entities";
import { ref, onMounted } from "vue";
import MenuList from "./MenuList.vue";

const menus = ref<Menu[]>([]);
const paginationFilter = ref({ page: 0, limit: 6 });
const paginationData = ref({});

function getDayOfWeek(timestamp: string) {
  if (timestamp) {
    const daysOfWeek = [
      t("text.days.monday"),
      t("text.days.tuesday"),
      t("text.days.wednesday"),
      t("text.days.thursday"),
      t("text.days.friday"),
      t("text.days.saturday"),
    ];
    const date = new Date(parseInt(timestamp));
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }
  return "";
}

async function getMenu() {
  try {
    await runQuery(GetMenu, {
      pagination: { ...paginationFilter.value },
    }).then(({ getMenu }) => {
      const menuItems = getMenu.nodes.map((menu: Menu) => ({
        ...menu,
        dayOfWeek: getDayOfWeek(menu.date),
      }));
      menus.value = menuItems;
      paginationData.value = getMenu.pagination;
    });
  } catch {
    negativeNotify(t("notifications.fail.showMenu"));
  }
}

onMounted(() => {
  getMenu();
});
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
      <q-btn
        round
        icon="arrow_back"
        class="row q-mt-md hide-print"
        color="primary"
        size="1.2rem"
        @click="$router.replace('/menu/create')"
      />
      <PrintButton class="q-mr-md hide-print" />
    </div>

    <menu-list :menus="menus" />
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
</style>
