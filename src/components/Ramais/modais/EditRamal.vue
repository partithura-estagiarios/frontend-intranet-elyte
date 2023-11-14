<script setup lang="ts">
import UpdateRamal from "../../../graphql/ramais/updateRamal.gql";

const emits = defineEmits(["reload", "cancel"]);
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    required: true,
  },
});
const form = reactive({
  ramalUser: props.item.ramalUser,
  sectorUser: props.item.sectorUser,
  ramalNumber: props.item.ramalNumber,
});

async function updateRamal(form: Object) {
  try {
    await runMutation(UpdateRamal, { id: props.item.id, data: form });
    positiveNotify(t("notifications.success.deleteRamal"));
    emits("reload");
  } catch {
    negativeNotify(t("notifications.success.deleteRamal"));
  }
}
</script>

<template>
  <DynamicDialog
    hideControls
    @cancel="() => $emit('cancel')"
    :open="isActive"
    :title="$t('action.editRamal.index')"
  >
    <FormRamal is-active :item="form" @some-form="updateRamal" />
  </DynamicDialog>
</template>
