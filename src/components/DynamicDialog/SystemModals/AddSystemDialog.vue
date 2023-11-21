<script setup lang="ts">
import AddSystem from "../../../graphql/system/AddSystem.gql";
import { Field, Form } from "vee-validate";
import { System } from "../../../entities";
import { inputSchema } from "../../../validation";
import { PropType } from "vue";

const emits = defineEmits(["reload", "cancel"]);

async function handleFormSubmission(form: System) {
  const response = await runMutation(AddSystem, { data: form });
  if (!response.id) {
    positiveNotify(t("notifications.success.createSystem"));
    return emits("reload");
  }
  negativeNotify(t("notifications.fail.createSystem"));
}
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object as PropType<System>,
    required: true,
  },
  system: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <DynamicDialog
    hide-controls
    :open="isActive"
    :title="$t('action.addSystem.index')"
    @cancel="() => $emit('cancel')"
  >
    <FormSystemDialog
      :item="item"
      :system="system"
      @some-form="(form) => handleFormSubmission(form)"
    >
    </FormSystemDialog>
  </DynamicDialog>
</template>
