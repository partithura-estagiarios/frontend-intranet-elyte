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
    :rows="(some.getRamais as any)"
    :v-bind="$attrs"
    class="q-mt-lg"
  >
    <template #top-left>
      <q-btn outline color="primary" class="border" @click="ramalForm = true">
        <q-icon class="q-mr-sm" name="add" color="red" />
        <span>{{ $t("action.addRamal.index") }}</span>
      </q-btn>
    </template>
    <template #configButtons="{ item }">
      <ActionButtons :items="some.getRamais" :item="item" :buttons="buttons" />
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
import DeleteBtn from "./DeleteBtn.vue";
import EditBtn from "./EditBtn.vue";

const some: any = ref([]);

const ramalForm = ref(false);

onMounted(() => {
  parsedList();
});

const buttons = [
  {
    component: DeleteBtn,
  },
  {
    component: EditBtn,
  },
];

async function parsedList() {
  some.value = await runMutation(GetRamais, {});
  return some;
}

async function addRamal(ramal: Record<string, string | number>) {
  try {
    await runMutation(AddRamal, { data: { ...ramal } });
    await parsedList();
    positiveNotify(t("notifications.success.createRamal"));
  } catch {
    negativeNotify(t("notifications.fail.createRamal"));
  } finally {
    ramalForm.value = false;
  }
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
  {
    name: "actions",
    align: "center",
    label: "",
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
