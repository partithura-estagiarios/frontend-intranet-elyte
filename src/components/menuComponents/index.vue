<template>
  <p class="text-h3 text-black">{{ $t("titles.menu") }}</p>

  <TableDynamic :columns="columns" :rows="menuList" />
</template>

<script setup lang="ts">
import GetMenu from "../../graphql/menu/getMenu.gql";

const menuList = ref();

onMounted(async () => {
  const { getMenu } = await runQuery(GetMenu);
  menuList.value = getMenu;
});

const columns = [
  {
    field: "day",
    align: "left",
    label: t("text.menu.day"),
    name: "Setor",
  },
  {
    field: "salad",
    required: true,
    label: t("text.menu.salad"),
    align: "center",
    name: "name",
  },
  {
    field: "complement",
    align: "center",
    label: t("text.menu.complement"),
    name: "Ramal",
  },
  {
    field: "rice",
    align: "center",
    label: t("text.menu.rice"),
    name: "Ramal",
  },
  {
    field: "soup",
    align: "center",
    label: t("text.menu.soup"),
    name: "Ramal",
  },
  {
    field: "protein",
    align: "center",
    label: t("text.menu.protein"),
    name: "Ramal",
  },
  {
    field: "dessert",
    align: "center",
    label: t("text.menu.dessert"),
    name: "Ramal",
  },
];
</script>
