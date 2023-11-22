<template>
  <q-tooltip anchor="top left" v-if="!activeConfirm">
    <strong>{{ t("titles.FieldsFilled") }}</strong>
    <ul>
      <li v-for="(value, key) in missingFields" :key="key">
        {{ $t(`label.${key}`) }}
      </li>
    </ul>
  </q-tooltip>
</template>
<script setup lang="ts">
const emits = defineEmits(["release-button"]);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const activeConfirm = ref(false);
const isFormFilled = computed(() => {
  return Object.values(props.item).every((value) => !!value);
});
const missingFields = computed(() => {
  const missing: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(props.item)) {
    if (!value) {
      activeConfirm.value = false;
      missing[key] = value;
    }
  }
  return missing;
});
watch(isFormFilled, (newIsFormFilled) => {
  if (newIsFormFilled) {
    activeConfirm.value = true;
    return emitTooltip();
  }
  activeConfirm.value = false;
  return emitTooltip();
});
function emitTooltip() {
  emits("release-button", activeConfirm.value);
}
</script>
