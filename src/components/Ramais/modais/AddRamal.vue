<script setup lang="ts">
import AddRamal from "../../../graphql/ramais/addRamal.gql";

const emits = defineEmits(["reload", "cancel"]);
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
});
async function addRamal(form: Object) {
  const result = await runMutation(AddRamal, { data: form });
  if (result !== undefined) {
    positiveNotify(t("notifications.success.createRamal"));
    return emits("reload");
  }
  negativeNotify(t("notifications.fail.createRamal"));
}
</script>

<template>
  <DynamicDialog
    hideControls
    @cancel="() => $emit('cancel')"
    :open="isActive"
    :title="$t('action.addRamal.index')"
  >
    <FormRamal :is-active="true" :item="item" @some-form="addRamal" />
  </DynamicDialog>
</template>
