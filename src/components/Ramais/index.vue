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
    <table-dynamic
      :columns="columns"
      :rows="ramalList"
      v-bind="$attrs"
      @add="ramalForm = true"
    />

    <CreateRamal
      :open="ramalForm"
      v-bind="$attrs"
      @confirm="addRamal"
      @cancel="ramalForm = false"
    />
  </div>
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import AddRamal from "../../graphql/ramais/createRamal.gql";

async function getRamais() {
  const { getRamais } = await runQuery(GetRamais);
  ramalList.value = getRamais;
}

const ramalList = ref();
const ramalForm = ref(false);

async function addRamal(ramal: Record<string, string | number>) {
  try {
    const { createRamal } = await runMutation(AddRamal, { data: { ...ramal } });
    positiveNotify(t("notifications.success.createRamal"));
  } catch {
    negativeNotify(t("notifications.fail.createRamal"));
  } finally {
    ramalForm.value = false;
  }
}

onMounted(() => {
  getRamais();
});

const columns = [
  {
    field: (getRamais) => getRamais.ramal_user,
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
.margin {
  margin-top: -4rem;
  padding-right: 6rem;
  padding-left: 6rem;
}
</style>
