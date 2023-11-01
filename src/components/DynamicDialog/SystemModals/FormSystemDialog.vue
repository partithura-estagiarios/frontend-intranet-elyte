<template>
  <TestForm />
  <Form :validation-schema="formSystem" class="row q-pa-md">
    <Field name="label" v-slot="item">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('text.label')"
        v-model="form.label"
        v-bind="item.field"
      >
      </q-input>
    </Field>
    <Field name="icon" v-slot="item">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('text.icon')"
        v-model="form.icon"
        v-bind="item.field"
      >
        <template #append>
          <div class="q-pa-md"></div>
        </template>
      </q-input>
    </Field>
    <Field name="sublabel" v-slot="item">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('text.sublabel')"
        v-model="form.sublabel"
        v-bind="item.field"
      >
      </q-input>
    </Field>
    <q-input
      disable
      class="col-6 q-px-xs"
      :label="$t('text.system')"
      v-model="props.item.sistema"
    >
    </q-input>
    <Field name="link" v-slot="item">
      <q-input
        class="col-12 q-px-xs q-mb-xl"
        :label="$t('text.link')"
        v-model="form.link"
        v-bind="item.field"
      >
      </q-input>
    </Field>

    <div class="q-ml-auto">
      <q-btn
        @click.prevent="emitForm"
        flat
        color="primary"
        label="Confirmar"
        type="submit"
        :disabled="!activeConfirm"
      >
        <q-tooltip anchor="top end" self="top end" v-if="!activeConfirm">
          <strong>Campos que faltam ser preenchidos</strong>
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
import { Field, Form } from "vee-validate";
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
  sistema: "",
  sublabel: "",
  link: "",
});

onMounted(() => {
  form.label = props.item.label;
  form.icon = props.item.icon;
  form.sistema = props.item.sistema;
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
      missing[key] = value;
    }
  }
  return missing;
});
watch(isFormFilled, (isFilled) => {
  if (isFilled) {
    activeConfirm.value = true;
  }
});

function emitForm() {
  console.log(props.item.sistema);
  emit("some-form", form);
}
</script>
