<script setup lang="ts">
import AddSystem from "../../../graphql/system/AddSystem.gql";
import { System } from "../../../entities";
import { Field, Form } from "vee-validate";
import { inputSchema } from "../../../validation";

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
});
const ICON_LIBRARY_BASE_URL = "https://pictogrammers.com/library/mdi/";

const form = reactive({
  icon: "",
  label: "",
  sublabel: "",
  link: "",
  sistema: props.system,
});
async function createSystem() {
  try {
    await runMutation(AddSystem, { data: form });
    positiveNotify(t("notifications.success.createSystem"));
    emits("reload");
  } catch (err) {
    negativeNotify(t("notifications.fail.createSystem"));
  }
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    @confirm="createSystem"
    :open="isActive"
    :title="$t('action.addSystem.index')"
  >
    <Form :validation-schema="inputSchema" class="row q-pa-xl">
      <Field name="title" v-slot="item">
        <q-input
          class="col-6 q-px-xs"
          :label="$t('text.title')"
          :model-value="item.value"
          v-bind="item.field"
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <Field name="icon" v-slot="item">
        <q-input
          class="col-6 q-px-xs"
          :label="$t('text.icon')"
          :model-value="item.value"
          v-bind="item.field"
        >
          <template #prepend>
            <q-item clickable target="_blank">
              <q-icon class="col-sm-6" name="pageview">
                <q-tooltip anchor="top middle" self="bottom middle">
                  <span class="text-subtitle2">{{ $t("label.search") }}</span>
                </q-tooltip>
              </q-icon>
            </q-item>
          </template>
        </q-input>
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <Field name="description" v-slot="item">
        <q-input
          class="col-6 q-px-xs"
          :label="$t('text.description')"
          :model-value="item.value"
          v-bind="item.field"
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <Field name="system" v-slot="item">
        <q-input
          class="col-6 q-px-xs"
          :label="$t('text.system')"
          :model-value="item.value"
          v-bind="item.field"
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <Field name="link" v-slot="item">
        <q-input
          class="col-12 q-px-xs"
          :label="$t('text.link')"
          :model-value="item.value"
          v-bind="item.field"
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
    </Form>
  </DynamicDialog>
</template>
