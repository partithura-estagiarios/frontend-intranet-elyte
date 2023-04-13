<template>
  <Ramais />
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import { Ramal } from "../../entities/index";

onMounted(async () => {
  const { getRamais } = await runMutation(GetRamais, {});
  ramaisStorage.setRamais(getRamais as unknown as Ramal);
});
</script>
