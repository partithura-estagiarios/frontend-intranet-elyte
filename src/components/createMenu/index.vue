<template>
  <span class="text-black text-h4">{{ $t("titles.menu") }}</span>

  <MenuForm class="q-mt-xl" v-bind="$attrs" @confirm="addMenu" />
</template>

<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import CreateMenu from "../../graphql/menu/CreateMenu.gql";
import { Menu } from "../../entities";

function clearForm(formValue: Record<string, string | number>): void {
  formValue.salad = " ";
  formValue.rice = " ";
  formValue.complement = " ";
  formValue.soup = " ";
  formValue.protein = " ";
  formValue.dessert = " ";
  formValue.day = " ";
  formValue.week = " ";
}

async function addMenu(menu: Record<string, string | number>) {
  try {
    await runMutation(CreateMenu, { data: { ...menu } });
    const { getMenu } = await runMutation(GetMenu, {});
    menusStorage.setMenus(getMenu as unknown as [Menu]);
    positiveNotify(t("notifications.success.createMenu"));
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  } finally {
    clearForm(menu);
  }
}
</script>
