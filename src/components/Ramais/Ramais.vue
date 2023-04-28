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
    :rows="ramaisStorage.getRamais as unknown as Ramal[]"
    v-bind="$attrs"
    class="q-mt-lg"
  >
    <template #top-left v-if="userStorage.isLoggedIn">
      <q-btn outline color="primary" class="border" @click="ramalForm = true">
        <q-icon class="q-mr-sm" name="add" color="red" />
        <span>{{ $t("action.addRamal.index") }}</span>
      </q-btn>
    </template>

    <template #action-edit="{ item }">
      <q-btn icon="edit" flat color="blue" @click="selectEdit(item)" />
    </template>
    <template #action-delete="{ item }">
      <q-btn icon="delete" flat color="primary" @click="selectDelete(item)" />
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
    class="text-black"
    @cancel="confirm = false"
    @confirm="deleteRamal"
    :ramalItem="ramalItem"
  >
    <template #text>
      <span class="text-subtitle1">
        {{
          t("action.deleteRamal.index", {
            numero: ramalItem.ramal_number,
            nome: ramalItem.ramal_user,
            setor: ramalItem.sector_user,
          })
        }}
      </span>
    </template>
  </ConfirmDelete>

  <EditRamal
    :open="edit"
    @cancel="edit = false"
    class="text-black"
    :item="ramalItem"
    @confirm="editRamal"
  />
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import AddRamal from "../../graphql/ramais/createRamal.gql";
import DeleteRamal from "../../graphql/ramais/deleteRamal.gql";
import UpdateRamal from "../../graphql/ramais/updateRamal.gql";
import { Ramal } from "../../entities";

const ramalId = ref("");

const ramalItem = reactive({
  id: "",
  ramal_number: "",
  ramal_user: "",
  sector_user: "",
});

const fillRamalItem = function (item: Ramal) {
  ramalItem.id = item.id;
  ramalItem.ramal_number = item.ramal_number;
  ramalItem.ramal_user = item.ramal_user;
  ramalItem.sector_user = item.sector_user;
};

const ramalList = ref(ramaisStorage.getRamais);
const ramalForm = ref(false);
const confirm = ref(false);
const edit = ref(false);

const event = defineEmits(["add", "delete", "edit"]);

const selectDelete = function (item: Ramal) {
  confirm.value = true;
  fillRamalItem(item);
  loga(ramalItem);
};

const selectEdit = function (item: Ramal) {
  edit.value = true;
  fillRamalItem(item);
};

async function refreshRamais() {
  const { getRamais } = await runMutation(GetRamais, {});
  ramaisStorage.setRamais(getRamais as unknown as Ramal);
}

async function editRamal(item: Ramal) {
  event("edit", item);
  const id = item.id;
  const data = {
    ramal_user: item.ramal_user,
    ramal_number: item.ramal_number,
    sector_user: item.sector_user,
  };
  try {
    await runMutation(UpdateRamal, { id, data });
    await refreshRamais();
    positiveNotify(t("notifications.success.editRamal"));
  } catch {
    negativeNotify(t("notifications.fail.editRamal"));
  } finally {
    edit.value = false;
  }
}

async function deleteRamal(id: string) {
  event("delete", id);
  try {
    await runMutation(DeleteRamal, { id });
    await refreshRamais();
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
    await refreshRamais();
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
