<template>
  <div class="row q-pa-md justify-end">
    <q-input
      class="col-12 q-px-sm"
      v-model.lazy="form.ramalUser"
      :label="$t('label.name')"
    />
    <q-input
      mask="#####"
      class="col-6 q-px-sm"
      v-model.lazy="form.ramalNumber"
      :label="$t('label.ramalNumber')"
    />
    <q-input
      class="col-6 q-px-sm"
      v-model.lazy="form.sectorUser"
      :label="$t('label.sectorUser')"
    />
    <q-btn
      @click.prevent="emitForm"
      flat
      color="primary"
      label="Confirmar"
      type="submit"
      :disabled="!activeConfirm"
    >
      <TooltipField
        :item="form"
        @release-button="(enable) => (enableConfirmation = enable)"
      />
    </q-btn>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["some-form"]);
const enableConfirmation = ref(false);

const activeConfirm = computed(() => {
  return enableConfirmation.value;
});
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    required: true,
  },
});
const form = reactive({
  ramalUser: "",
  sectorUser: "",
  ramalNumber: "",
});
onMounted(() => {
  form.ramalUser = props.item.ramalUser;
  form.sectorUser = props.item.sectorUser;
  form.ramalNumber = props.item.ramalNumber;
});

function emitForm() {
  emit("some-form", form);
}
</script>
