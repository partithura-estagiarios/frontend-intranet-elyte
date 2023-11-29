<script setup lang="ts">
const props = defineProps(["formData"]);
</script>

<template>
  <div class="column col-4 q-pa-sm items-center">
    <h6>{{ $t("titles.IconPreview") }}</h6>
    <q-item-section>
      <q-avatar size="7rem">
        <q-icon
          class="border icon border-radius-inherit q-pa-md"
          size="4rem"
          :name="formData.icon"
        />
      </q-avatar>
    </q-item-section>
    <q-item-section class="q-mt-md">
      <q-item-label class="text-grey-8 text-h6 text-weight-bolder text-no-wrap">
        {{ formData.label ? $t(formData.label) : $t("label.label") }}
      </q-item-label>
    </q-item-section>

    <q-item-section class="q-mt-sm">
      <q-item-label class="text-grey text-weight-bolder text-no-wrap">
        {{ formData.sublabel ? $t(formData.sublabel) : $t("label.sublabel") }}
      </q-item-label>
    </q-item-section>
  </div>
</template>
<style scoped>
.border {
  border: 8px solid;
  border-color: rgb(164, 164, 164, 0.4);
  border-radius: 100%;
  color: #c7c7c7;
}
</style>
