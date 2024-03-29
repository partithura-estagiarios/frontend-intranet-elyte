<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { Menu } from "../../entities";
import { ref, onMounted } from "vue";

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
    positiveNotify(t("notifications.success.showMenu"));
  } catch {
    negativeNotify(t("notifications.fail.showMenu"));
  }
}

onMounted(() => {
  getMenu();
});
</script>

<template>
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
      class="row q-mt-md"
      color="primary"
      size="1.2rem"
      @click="$router.replace('/menu/create')"
    />
    <PrintButton class="q-mr-md no-print" />
  </div>

  <div class="row justify-center no-print">
    <div class="col">
      <div v-if="menus.length === 0" class="text-center relative text-h5">
        <span>{{ $t("warning.noRegistrationMenu") }}</span>
      </div>
      <div v-else class="row">
        <div class="col">
          <div class="row">
            <template
              v-for="(daysMenu, daysOfWeek) in menus"
              :key="daysOfWeek"
              class="col"
            >
              <div class="col-4 no-padding no-margin">
                <q-card
                  class="text-uppercase col q-ma-md border smaller-card mx-auto text-white"
                >
                  <q-card-section class="bg-primary">
                    <div v-if="daysMenu">{{ daysMenu.dayOfWeek }}</div>
                  </q-card-section>
                  <q-card-section class="text-subtitle2 text-black">
                    <div v-if="daysMenu">
                      <div
                        class="menu-item"
                        v-for="property in [
                          'rice',
                          'salad',
                          'soup',
                          'complement',
                          'protein',
                          'dessert',
                        ]"
                        :key="property"
                      >
                        <q-icon name="restaurant" class="menu-icon" />
                        <p class="menu-text">{{ daysMenu[property] }}</p>
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
  max-width: 290px;
  margin: 10px auto;
}
</style>
