<template>
  <q-item class="row">
    <div class="col-5">
      <BackButton class="justify-start row q-ml-md" />
    </div>
    <div class="col-6 row justify-start">
      <span class="text-black font text-bold q-ml-xl">
        {{ $t("titles.Hr.Fones") }}
        <q-icon color="primary" class="q-ml-sm" name="call" size="2rem" />
        <q-separator size="0.5rem" color="primary" class="bar-style" />
      </span>
    </div>
  </q-item>
  <table-dynamic
    :columns="columns"
    :rows="(some as Ramal[])"
    :v-bind="$attrs"
    class="q-mt-lg"
  />
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import { Ramal } from "../../entities";
import { Ref } from "vue";

const some: Ref<Ramal[]> = ref([]);

onMounted(() => {
  getListRamal();
});

async function getListRamal() {
  const { getRamais } = (await runMutation(GetRamais, {})) as unknown as Record<
    "getRamais",
    Array<Ramal>
  >;
  some.value = getRamais;
  return some;
}

const columns = [
  {
    field: (getRamais: Ramal) => getRamais.ramal_user,
    required: true,
    sortable: true,
    label: t("text.name"),
    align: "left",
    name: "name",
  },
  {
    field: "sector_user",
    align: "left",
    label: t("text.sector"),
    sortable: true,
    name: "Setor",
  },
  {
    field: "ramal_number",
    align: "left",
    label: t("text.number"),
    sortable: true,
    name: "Ramal",
  },
];
</script>

<style scoped>
.font {
  font-size: 2rem;
}
.bar-style {
  border-radius: 10px;
}
</style>
