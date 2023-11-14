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
      <q-input
        :mask="fieldMask"
        :type="fieldType"
        v-bind="item.field"
        :label="fieldLabel"
        :bg-color="fieldColor"
        :borderless="borderless"
        :model-value="item.value"
      >
        <template #prepend>
          <q-icon
            :name="iconName"
            :size="iconSize"
            :color="iconColor"
            :class="iconClass"
          />
        </template>
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </q-input>
    </Field>
  </div>
</template>
