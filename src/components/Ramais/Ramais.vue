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
    :rows="ramaisStorage.getRamais"
    v-bind="$attrs"
    class="q-mt-lg"
  >
    <template #top-left>
      <q-btn outline color="primary" class="border" @click="ramalForm = true">
        <q-icon class="q-mr-sm" name="add" color="red" />
        <span>{{ $t("action.addRamal.index") }}</span>
      </q-btn>
    </template>

    <template #actions="{ item }">
      <q-btn icon="delete" flat color="primary" @click="selectRamal(item)" />
    </template>
  </table-dynamic>

  <CreateRamal
    :open="ramalForm"
    v-bind="$attrs"
    @confirm="addRamal"
    @cancel="ramalForm = false"
  />

  <ConfirmDelete
    :open="confirm"
    :text="$t('action.deleteRamal.index')"
    class="text-black"
    @cancel="confirm = false"
    @confirm="deleteRamal"
    :id="ramalId"
  />
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import AddRamal from "../../graphql/ramais/createRamal.gql";
import DeleteRamal from "../../graphql/ramais/deleteRamal.gql";
import { Ramal } from "../../entities";

const ramalId = ref("");

const ramalList = ref(ramaisStorage.getRamais);
const ramalForm = ref(false);
const confirm = ref(false);

const selectRamal = function (item: Ramal) {
  confirm.value = true;
  ramalId.value = item.id;
};

const event = defineEmits(["add", "delete"]);

async function deleteRamal(id: string) {
  event("delete", id);
  try {
    await runMutation(DeleteRamal, { id });
    const { getRamais } = await runMutation(GetRamais, {});
    ramaisStorage.setRamais(getRamais as unknown as Ramal);
    positiveNotify(t("notifications.success.deleteRamal"));
  } catch {
    negativeNotify(t("notifications.fail.deleteRamal"));
  } finally {
    confirm.value = false;
  }
}

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
