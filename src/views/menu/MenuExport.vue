<template>
  <MenuImage />
</template>

<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { Menu } from "../../entities/index";

onMounted(async () => {
  const { getMenu } = await runQuery(GetMenu);
  menusStorage.setMenus(getMenu as unknown as Menu);
});
</script>
