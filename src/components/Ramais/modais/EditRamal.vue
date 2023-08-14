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
    default: () => {},
  },
});
const form = reactive({
  ramalUser: props.item.ramalUser,
  sectorUser: props.item.sectorUser,
  ramalNumber: props.item.ramalNumber,
});

async function updateRamal() {
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
    @cancel="() => $emit('cancel')"
    @confirm="updateRamal"
    :open="isActive"
    :title="$t('action.editRamal.index')"
  >
    <div class="row q-pa-md">
      <q-input
        class="col-12 q-px-sm"
        v-model="form.ramalUser"
        :label="$t('label.name')"
        :rules="[(val: string) => validateNotEmpty(val)]"
      />
      <q-input
        class="col-6 q-px-sm"
        mask="######"
        v-model="form.ramalNumber"
        :label="$t('label.ramalNumber')"
        :rules="[(val: string) => validateNotEmpty(val)]"
      />
      <q-input
        class="col-6 q-px-sm"
        v-model="form.sectorUser"
        :label="$t('label.sector')"
        :rules="[(val: string) => validateNotEmpty(val)]"
      />
    </div>
  </DynamicDialog>
</template>
