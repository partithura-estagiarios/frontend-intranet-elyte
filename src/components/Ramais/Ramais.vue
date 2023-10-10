<template>
  <q-item class="row">
    <div class="col-5">
      <BackButton class="justify-start row q-ml-md" />
    </div>
    <div class="col-6 row justify-start">
      <span class="text-black font text-bold q-ml-xl">
        {{ $t("titles.Hr.Fones") }}
        <q-separator size="0.5rem" color="primary" class="bar-style" />
      </span>
    </div>
  </q-item>
  <table-dynamic
    :columns="columns"
    :rows="(ramalList as Array<Ramal>)"
    :v-bind="$attrs"
    class="q-mt-lg"
  >
    <template #top-left v-if="userStorage.getToken">
      <q-btn
        class="bg-primary text-white text-bold"
        @click="activedModal = true"
        :label="$t('action.addRamal.index')"
      >
        <AddRamal
          :isActive="activedModal"
          @reload="getListRamal()"
          @cancel="activedModal = false"
        />
      </q-btn>
    </template>

    <template #configButtons="{ item }" v-if="userStorage.getToken">
      <ActionButton
        :buttons="actionButtons"
        :item="item"
        @reload="getListRamal()"
      />
    </template>
  </table-dynamic>
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import { Ramal } from "../../entities";
import { Ref } from "vue";
import actionButtons from "./actionButtons";

const ramalList: Ref<Ramal[]> = ref([]);
const activedModal = ref(false);
onMounted(() => {
  getListRamal();
});

async function getListRamal() {
  const { ramais } = (await runMutation(GetRamais, {})) as unknown as Record<
    "ramais",
    Array<Ramal>
  >;

  ramalList.value = ramais;
  return ramalList;
}

const columns = [
  {
    field: (getRamais: Ramal) => getRamais.ramalUser,
    required: true,
    sortable: true,
    label: t("text.name"),
    align: "left",
    name: "name",
  },
  {
    field: "sectorUser",
    align: "left",
    label: t("text.sector"),
    sortable: true,
    name: "Setor",
  },
  {
    field: "ramalNumber",
    align: "left",
    label: t("text.number"),
    sortable: true,
    name: "Ramal",
  },
  {
    name: "actions",
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
