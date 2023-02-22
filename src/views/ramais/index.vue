<template>
  <div class="margin">
    <div class="row justify-center">
      <q-card-section class="q-my-md">
        <span class="text-black row font text-bold">
          {{ $t("titles.SubTitlesHr.Fones") }}
          <q-icon color="primary" class="q-ml-sm" name="call" size="2rem" />
        </span>
        <q-separator size="0.5rem" color="primary" class="bar-style" />
      </q-card-section>
    </div>
    <table-dynamic :columns="columns" :rows="data?.getRamais" />
  </div>
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import GetRamal from "../../graphql/ramais/getRamal.gql";
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

const columns = [
  {
    field: (getRamais) => getRamais.ramal_user,
    required: true,
    sortable: true,
    label: "Nome",
    align: "left",
    name: "name",
  },
  {
    field: "sector_user",
    align: "center",
    label: "Setor",
    sortable: true,
    name: "Setor",
  },
  {
    field: "ramal_number",
    align: "right",
    label: "Número",
    sortable: true,
    name: "Ramal",
  },
];

const showRamal = ref(false);
const ramal = reactive({});
</script>

<style scoped>
.font {
  font-size: 2rem;
}
.bar-style {
  border-radius: 10px;
}
.margin {
  margin-top: -4rem;
  padding-right: 6rem;
  padding-left: 6rem;
}
</style>
