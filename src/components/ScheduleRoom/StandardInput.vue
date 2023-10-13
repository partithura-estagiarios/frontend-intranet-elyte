<script setup lang="ts">
import { Field } from "vee-validate";

defineProps({
  fieldName: {
    type: String,
    default: "",
  },
  fieldColor: {
    type: String,
    default: "",
  },
  fieldClass: {
    type: String,
    default: "",
  },
  fieldLabel: {
    type: String,
    default: "",
  },
  fieldType: {
    type: String,
    default: "",
  },
  fieldMask: {
    type: String,
    default: "",
  },
  borderless: {
    type: Boolean,
    default: false,
  },
  iconName: {
    type: String,
    default: "",
  },
  iconClass: {
    type: String,
    default: "",
  },
  iconSize: {
    type: String,
    default: "",
  },
  iconColor: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>
    <Field :name="fieldName" v-slot="item">
      <div>
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          :borderless="borderless"
          :bg-color="fieldColor"
          :label="fieldLabel"
          :type="fieldType"
          :mask="fieldMask"
        >
          <template #prepend>
            <q-icon
              :name="iconName"
              :class="iconClass"
              :size="iconSize"
              :color="iconColor"
            />
          </template>
          <span v-if="item.errorMessage" class="text-red">
            {{ parseErrorMessage(item.errorMessage) }}
          </span>
        </q-input>
      </div>
    </Field>
  </div>
</template>
