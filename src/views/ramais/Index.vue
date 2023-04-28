<template>
  <HeaderBar />
  <Ramais />
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import { Ramal } from "../../entities/Ramal";

onMounted(async () => {
  const { getRamais } = await runQuery(GetRamais);
  ramaisStorage.setRamais(getRamais as unknown as Ramal);
});
</script>
