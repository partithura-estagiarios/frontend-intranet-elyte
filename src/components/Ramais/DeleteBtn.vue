<template>
  <q-btn
    v-model="confirm"
    v-bind="$attrs"
    icon="delete"
    flat
    color="primary"
    @click="() => (confirm = true)"
  />

  <ConfirmDelete
    :open="confirm"
    class="text-black"
    @cancel="confirm = false"
    @confirm="deleteRamal"
    :ramalItem="item"
  >
    <template #text>
      <span class="text-subtitle1">
        {{
          t("action.deleteRamal.index", {
            numero: item.ramal_number,
            nome: item.ramal_user,
            setor: item.sector_user,
          })
        }}
      </span>
    </template>
  </ConfirmDelete>
</template>

<script lang="ts" setup>
import DeleteRamal from "../../graphql/ramais/deleteRamal.gql";
import GetRamais from "../../graphql/ramais/getRamais.gql";

const confirm = ref(false);

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

async function deleteRamal(id: string) {
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
</script>
