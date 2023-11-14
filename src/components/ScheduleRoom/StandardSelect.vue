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
  popupContentClass: {
    type: String,
    default: "",
  },
  disableSelect: {
    type: Boolean,
    default: "",
  },
  optionsToSelect: {
    type: Array,
    required: true,
  },
  optionsToDisable: {
    type: Object,
    required: true,
  },
  optionValue: {
    type: Number,
    required: true,
  },
  optionLabel: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <Field :name="fieldName" v-slot="item">
      <q-select
        emit-value
        map-options
        :type="fieldType"
        :label="fieldLabel"
        v-bind="item.field"
        :bg-color="fieldColor"
        :borderless="borderless"
        :model-value="item.value"
        :popup-content-class="popupContentClass"
        :disable="disableSelect"
        :options="optionsToSelect"
        :option-label="optionLabel"
        :option-value="optionValue"
        :option-disable="optionsToDisable"
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
      </q-select>
    </Field>
  </div>
</template>
