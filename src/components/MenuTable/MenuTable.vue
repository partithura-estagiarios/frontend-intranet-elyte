<template>
  <p class="text-h3 text-black">{{ $t("titles.menu") }}</p>

  <TableDynamic :columns="columns" :rows="menuList" />
</template>

<script setup lang="ts">
import { Ref } from "vue";
import GetMenu from "../../graphql/menu/GetMenu.gql";

const menuList: Ref<Array<Record<string, string | number>>> = ref(
  menusStorage.getMenus
);

watchEffect(() => {
  menuList.value = menusStorage.getMenus;
});

onMounted(async () => {
  const { getMenu } = await runQuery(GetMenu);
  menuList.value = getMenu;
});

const columns = [
  {
    field: "date",
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
