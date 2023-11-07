<template>
  <Form :validation-schema="formSystem" class="row q-pa-md">
    <Field name="label" v-slot="item">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('text.label')"
        v-model.lazy="form.label"
        v-bind="item.field"
      >
      </q-input>
    </Field>
    <Field name="icon" v-slot="item">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('text.icon')"
        v-model.lazy="form.icon"
        v-bind="item.field"
      >
        <template #append>
          <IconsForSystemDialog @some-icon="(icon) => (form.icon = icon)" />
        </template>
      </q-input>
    </Field>
    <Field name="sublabel" v-slot="item">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('text.sublabel')"
        v-model.lazy="form.sublabel"
        v-bind="item.field"
      >
      </q-input>
    </Field>
    <q-input
      disable
      class="col-6 q-px-xs"
      :label="$t('text.system')"
      v-model.lazy="props.system"
    >
    </q-input>
    <Field name="link" v-slot="item">
      <q-input
        class="col-12 q-px-xs q-mb-xl"
        :label="$t('text.link')"
        v-model.lazy="form.link"
        v-bind="item.field"
      >
      </q-input>
    </Field>
    <div class="fit row justify-center">
      <PreviewSystemDialog :formData="form" />
    </div>
    <div class="q-ml-auto">
      <q-btn
        @click.prevent="emitForm"
        flat
        color="primary"
        label="Confirmar"
        type="submit"
        :disabled="!activeConfirm"
      >
        <q-tooltip anchor="top left" v-if="!activeConfirm">
          <strong>{{ t("titles.FieldsFilled") }}</strong>
          <ul>
            <li v-for="(value, key) in missingFields" :key="key">
              {{ $t(`text.${key}`) }}
            </li>
          </ul>
        </q-tooltip>
      </q-btn>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { formSystem } from "../../../validation";
import { System } from "../../../entities";
import { Field, Form, useForm } from "vee-validate";
import { PropType } from "vue";
const emit = defineEmits(["some-form"]);
const props = defineProps({
  submitForm: Function,
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

const form = reactive({
  label: "",
  icon: "",
  sistema: props.system,
  sublabel: "",
  link: "",
});

onMounted(() => {
  form.label = props.item.label;
  form.icon = props.item.icon;
  form.sublabel = props.item.sublabel;
  form.link = props.item.link;
});

const activeConfirm = ref(false);
const isFormFilled = computed(() => {
  return Object.values(form).every((value) => !!value);
});
const missingFields = computed(() => {
  const missing: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(form)) {
    if (!value) {
      activeConfirm.value = false;
      missing[key] = value;
    }
  }
  return missing;
});
watch(isFormFilled, (newIsFormFilled) => {
  if (newIsFormFilled) {
    return (activeConfirm.value = true);
  }
  return (activeConfirm.value = false);
});

function emitForm() {
  emit("some-form", form);
}
</script>
<style scoped>
.fit {
  margin-top: -80px;
}
</style>
