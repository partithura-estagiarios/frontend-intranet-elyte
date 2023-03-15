<template>
  <p class="text-h3 text-black">{{ $t("titles.menu") }}</p>

  <TableDynamic :columns="columns" :rows="menuList">
    <template #top-left>
      <q-btn outline color="primary" class="border" @click="menuForm = true">
        <q-icon class="q-mr-sm" name="add" color="red" />
        <span>{{ $t("action.addMenu.index") }}</span>
      </q-btn>
    </template>
  </TableDynamic>

  <CreateMenu
    :open="menuForm"
    @confirm="createMenu"
    @cancel="menuForm = false"
  />
</template>

<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import CreateMenu from "../../graphql/menu/CreateMenu.gql";

const menuList = ref(menusStorage.getMenus);
const menuForm = ref(false);

watchEffect(() => {
  menuList.value = menusStorage.getMenus;
});

async function createMenu(menu: Record<string, string | number>) {
  try {
    positiveNotify(t("notifications.success.createMenu"));
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  } finally {
    menuForm.value = false;
  }
}

onMounted(async () => {
  const { getMenu } = await runQuery(GetMenu);
  menuList.value = getMenu;
});

const columns = [
  {
    field: "day",
    align: "left",
    label: t("text.day"),
  },
  {
    field: "salad",
    required: true,
    label: t("text.menu.salad"),
    align: "center",
  },
  {
    field: "complement",
    align: "center",
    label: t("text.menu.complement"),
  },
  {
    field: "rice",
    align: "center",
    label: t("text.menu.rice"),
  },
  {
    field: "soup",
    align: "center",
    label: t("text.menu.soup"),
  },
  {
    field: "protein",
    align: "center",
    label: t("text.menu.protein"),
  },
  {
    field: "dessert",
    align: "center",
    label: t("text.menu.dessert"),
  },
];
</script>
