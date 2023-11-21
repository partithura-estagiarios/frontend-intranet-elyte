<script setup lang="ts">
import { Field, Form } from "vee-validate";
import { System } from "../../../entities";
import { inputSchema } from "../../../validation";

import UpdateSystem from "../../../graphql/system/UpdateSystem.gql";

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
  system: {
    type: String,
    default: "",
  },
  attSystem: {
    type: Function,
  },
});
const selectedSystem = ref<System>(buildForm());

const getSelectedSystem = (system: System) => {
  selectedSystem.value = system;
};
function buildForm() {
  return {
    id: "",
    icon: "",
    label: "",
    link: "",
    sistema: "",
    sublabel: "",
  };
}
const form: Omit<System, "id"> = reactive({
  icon: "",
  label: "",
  link: "",
  sistema: "",
  sublabel: "",
});

watch(selectedSystem, (newValue: System) => {
  form.icon = newValue.icon;
  form.label = newValue.label;
  form.link = newValue.link;
  form.sistema = newValue.sistema;
  form.sublabel = newValue.sublabel;
});

async function updateSystem(form: System) {
  const response = await runMutation(UpdateSystem, {
    id: selectedSystem.value.id,
    data: form,
  });
  if (response.updateSystem) {
    positiveNotify(t("notifications.success.editSystem"));
    props.attSystem;
    return (selectedSystem.value = buildForm());
  }
  negativeNotify(t("notifications.fail.failEditSystem"));
}
</script>

<template>
  <DynamicDialog
    @cancel="() => [$emit('cancel'), (selectedSystem = buildForm())]"
    hide-controls
    :open="isActive"
    :title="$t('action.editSystem.index')"
  >
    <div v-if="selectedSystem.id == ''" class="row q-gutter-md q-pa-md">
      <span class="text-secondary text-h6 q-pl-sm">{{
        $t("action.editSystem.message")
      }}</span>
      <div class="row max-size-list scroll fit">
        <q-item
          v-for="sys in props.item"
          :key="sys.id"
          clickable
          target="_blank"
          class="row q-py-lg col-4 no-scroll item"
          @click="getSelectedSystem(sys)"
        >
          <div class="row fit q-gutter-x-sm">
            <q-avatar size="4rem">
              <q-icon class="fit" :name="sys.icon" color="secondary" />
            </q-avatar>

            <q-item-section class="q-mt-md">
              <q-item-label
                class="text-secondary text-body1 text-weight-bolder text-no-wrap"
              >
                {{ $t(sys.label) }}
              </q-item-label>
              <q-item-label
                class="text-grey text-subtitle text-weight-bolder text-no-wrap"
              >
                {{ $t(sys.sublabel) }}
              </q-item-label>
            </q-item-section>
          </div>
        </q-item>
      </div>
    </div>

    <div v-else>
      <FormSystemDialog
        :item="selectedSystem"
        :system="system"
        @some-form="(form) => updateSystem(form)"
        @back-modal="() => (selectedSystem = buildForm())"
      >
      </FormSystemDialog>
    </div>
  </DynamicDialog>
</template>

<style scoped>
.max-size-list {
  max-height: 30vh;
}
.item:hover {
  background-color: rgb(164, 164, 164, 0.2);
}
</style>
