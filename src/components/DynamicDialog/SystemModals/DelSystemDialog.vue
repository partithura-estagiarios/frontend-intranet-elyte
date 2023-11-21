<script setup lang="ts">
import { System } from "../../../entities";
import DeleteSystem from "../../../graphql/system/DeleteSystem.gql";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emits = defineEmits(["reload", "cancel"]);
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Array<System>,
    required: true,
  },
  attSystem: {
    type: Function,
  },
});
const storageSystemExclusion = ref([]);
async function deleteSystem() {
  if (storageSystemExclusion.value.length > 0) {
    try {
      await runMutation(DeleteSystem, { id: storageSystemExclusion.value });
      positiveNotify(
        t(
          "notifications.success.deleteSystem",
          parseToPlural(storageSystemExclusion.value)
        )
      );
      props.attSystem;
    } catch (err) {
      negativeNotify(
        t(
          "notifications.fail.deleteSystem.error",
          parseToPlural(storageSystemExclusion.value)
        )
      );
    }
    return;
  }
  negativeNotify(t("notifications.fail.deleteSystem.notSelected"));
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    @confirm="deleteSystem"
    :open="isActive"
    :title="$t('action.delSystem.index')"
  >
    <CheckBoxDeleteSystem
      :iconsForExclusion="$props.item"
      @some-exclusion="(systems) => (storageSystemExclusion = systems)"
    />
  </DynamicDialog>
</template>

<style scoped>
.max-size-list {
  max-height: 30vh;
}
</style>
