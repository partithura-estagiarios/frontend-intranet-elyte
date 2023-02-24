<template>
  <Ramais />
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import { Ramal } from "../../entities/Ramal";
import { useQuery } from "villus";

async function getRamais() {
  const { getRamais } = await runQuery(GetRamais);
  ramaisStorage.setRamais(getRamais as unknown as [Ramal]);
}

onMounted(() => {
  getRamais();
});

const { data } = useQuery({ query: GetRamais });
</script>
