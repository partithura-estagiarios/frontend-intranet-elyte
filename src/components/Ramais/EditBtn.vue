<template>
  <q-btn
    v-model="edit"
    v-bind="$attrs"
    icon="edit"
    flat
    color="blue"
    @click="() => (edit = true)"
  />

  <EditRamal
    :open="edit"
    @cancel="edit = false"
    class="text-black"
    :item="item"
    @confirm="editRamal(item)"
  />
</template>

<script lang="ts" setup>
import UpdateRamal from "../../graphql/ramais/updateRamal.gql";
import GetRamais from "../../graphql/ramais/getRamais.gql";

const edit = ref(false);

defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

async function refreshRamais() {
  const { getRamais } = await runMutation(GetRamais, {});
  ramaisStorage.setRamais(getRamais as any);
}

async function editRamal(parametro: any) {
  const id = parametro.id;
  const data = {
    ramal_user: parametro.ramal_user,
    ramal_number: parametro.ramal_number,
    sector_user: parametro.sector_user,
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
</script>
