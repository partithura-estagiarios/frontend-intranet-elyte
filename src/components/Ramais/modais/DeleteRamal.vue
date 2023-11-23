<script setup lang="ts">
import DeleteRamal from "../../../graphql/ramais/deleteRamal.gql";

const emits = defineEmits(["reload", "cancel"]);
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => {},
  },
});

async function deleteRamal(id: object) {
  try {
    await runMutation(DeleteRamal, { id });
    positiveNotify(t("notifications.success.deleteRamal"));
    emits("reload");
  } catch {
    negativeNotify(t("notifications.fail.deleteRamal.error"));
  }
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    @confirm="deleteRamal(item.id)"
    :open="isActive"
    :title="$t('action.deleteRamal.index')"
  >
    <span class="text-secondary text-h6">
      {{
        $t("action.deleteRamal.message", {
          numero: item.ramalNumber,
          nome: item.ramalUser,
          setor: item.sectorUser,
        })
      }}
    </span>
  </DynamicDialog>
</template>
