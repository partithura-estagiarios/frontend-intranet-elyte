<template>
  <Form :validation-schema="formSystem" class="row q-pa-md">
    <Field name="label" v-slot="item">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('label.label')"
        v-model.lazy="form.label"
        v-bind="item.field"
      >
      </q-input>
    </Field>
    <Field name="icon" v-slot="item">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('label.icon')"
        v-model.lazy="form.icon"
        v-bind="item.field"
      >
        <template #append>
          <div class="q-pt-none bg-white">
            <IconsForSystemDialog @some-icon="(icon) => (form.icon = icon)" />
          </div>
        </template>
      </q-input>
    </Field>
    <Field name="sublabel" v-slot="item">
      <q-input
        class="col-6 q-px-xs"
        :label="$t('label.sublabel')"
        v-model.lazy="form.sublabel"
        v-bind="item.field"
      >
      </q-input>
    </Field>
    <q-input
      disable
      class="col-6 q-px-xs"
      :label="$t('label.system')"
      v-model.lazy="props.system"
    >
    </q-input>
    <Field name="link" v-slot="item">
      <q-input
        class="col-12 q-px-xs q-mb-xl"
        :label="$t('label.link')"
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
        :disabled="!enableConfirmation"
      >
        <TooltipField
          :item="form"
          @release-button="(enable) => (enableConfirmation = enable)"
        >
        </TooltipField>
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
const enableConfirmation = ref(false);

const form = reactive({
  label: t("label.label"),
  icon: "",
  sistema: props.system,
  sublabel: t("label.sublabel"),
  link: "",
});

onMounted(() => {
  form.label = props.item.label;
  form.icon = props.item.icon;
  form.sublabel = props.item.sublabel;
  form.link = props.item.link;
});

function emitForm() {
  emit("some-form", form);
}
</script>
<style scoped>
.fit {
  margin-top: -80px;
}
.q-pt-none {
  max-height: 79%;
  position: relative;
  z-index: 2;
}
</style>
