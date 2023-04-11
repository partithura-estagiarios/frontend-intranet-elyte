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
    <table-dynamic :columns="columns" :rows="ramalList" v-bind="$attrs">
      <template #top-left v-if="userStorage.isLoggedIn">
        <q-btn outline color="primary" class="border" @click="ramalForm = true">
          <q-icon class="q-mr-sm" name="add" color="red" />
          <span>{{ $t("action.addRamal.index") }}</span>
        </q-btn>
      </template>
    </table-dynamic>

  <CreateRamal
    :open="ramalForm"
    v-bind="$attrs"
    @confirm="addRamal"
    @cancel="ramalForm = false"
  />
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import AddRamal from "../../graphql/ramais/createRamal.gql";
import { Ramal } from "../../entities";

const ramalList = ref(ramaisStorage.getRamais);
const ramalForm = ref(false);

const event = defineEmits(["add"]);

watchEffect(() => {
  ramalList.value = ramaisStorage.getRamais;
});

async function addRamal(ramal: Record<string, string | number>) {
  try {
    const data = await runMutation(AddRamal, { data: { ...ramal } });
    const { getRamais } = await runMutation(GetRamais, {});
    ramaisStorage.setRamais(getRamais as unknown as [Ramal]);
    positiveNotify(t("notifications.success.createRamal"));
  } catch {
    negativeNotify(t("notifications.fail.createRamal"));
  } finally {
    ramalForm.value = false;
  }
}

onMounted(async () => {
  const { getRamais } = await runMutation(GetRamais, {});
  ramalList.value = getRamais;
});

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
    align: "center",
    label: t("text.sector"),
    sortable: true,
    name: "Setor",
  },
  {
    field: "ramal_number",
    align: "right",
    label: t("text.number"),
    sortable: true,
    name: "Ramal",
  },
];

const ramal = reactive({});
</script>

<style scoped>
.font {
  font-size: 2rem;
}
.bar-style {
  border-radius: 10px;
}
</style>
