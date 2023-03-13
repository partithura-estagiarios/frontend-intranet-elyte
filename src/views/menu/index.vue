<template>
  <MenuTable />
</template>

<script setup lang="ts">
import GetMenu from "../../graphql/menu/getMenu.gql";
import { Menu } from "../../entities";

onMounted(async () => {
  const { getMenu } = await runQuery(GetMenu);
  menusStorage.setMenus(getMenu as unknown as [Menu]);
});
</script>
