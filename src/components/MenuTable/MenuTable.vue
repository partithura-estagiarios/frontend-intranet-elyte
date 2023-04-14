<template>
  <p class="text-h3 text-black q-mb-lg">{{ $t("titles.menu") }}</p>

  <TableDynamic
    :columns="columns"
    :rows="menusStorage.getMenus as unknown as Menu[]"
  />
</template>

<script setup lang="ts">
import { Menu } from "../../entities";

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
