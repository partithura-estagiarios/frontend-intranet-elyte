<template>
  <span class="text-black text-h4">{{ $t("titles.menu") }}</span>

  <MenuForm class="q-mt-xl" />
</template>

<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import CreateMenu from "../../graphql/menu/CreateMenu.gql";
import { Menu } from "../../entities";

async function addMenu(menu: Record<string, string | number>) {
  try {
    await runMutation(CreateMenu, { data: { ...menu } });
    const { getMenu } = await runMutation(GetMenu, {});
    menusStorage.setMenus(getMenu as unknown as [Menu]);
    positiveNotify(t("notifications.success.createMenu"));
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}
</script>
