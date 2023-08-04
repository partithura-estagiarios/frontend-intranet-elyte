<script setup lang="ts">
import AddRamal from "../../../graphql/ramais/addRamal.gql";

const emits = defineEmits(["reload", "cancel"]);
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
const form = reactive({
  ramalUser: "",
  sectorUser: "",
  ramalNumber: "",
});

async function addRamal() {
  try {
    await runMutation(AddRamal, { data: form });
    positiveNotify(t("notifications.success.createRamal"));
    emits("cancel");
    emits("reload");
  } catch {
    negativeNotify(t("notifications.fail.createRamal"));
  }
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    @confirm="addRamal"
    :open="isActive"
    :title="$t('action.addRamal.index')"
  >
    <div class="row q-pa-md">
      <q-input
        class="col-12 q-px-sm"
        v-model="form.ramalUser"
        :label="$t('label.name')"
        :rules="[(val: string) => validateNotEmpty(val)]"
      />
      <q-input
        mask="#####"
        class="col-6 q-px-sm"
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
