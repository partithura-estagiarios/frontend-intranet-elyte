<template>
  <div class="row q-gutter-md q-pa-md">
    <span class="text-secondary text-h6 q-pl-lg">{{
      $t("action.delSystem.message")
    }}</span>
    <div class="row max-size-list scroll fit">
      <q-item
        v-for="sys in props.iconsForExclusion"
        :key="sys.id"
        clickable
        target="_blank"
        class="row q-py-lg no-scroll col-4 q-gutter-x-sm"
      >
        <q-checkbox v-model="selectedSystems" :val="sys.id">
          <div class="row q-gutter-x-sm">
            <q-avatar size="4rem">
              <q-icon class="fit" :name="sys.icon" color="secondary" />
            </q-avatar>

            <q-item-section class="q-mt-md">
              <q-item-label
                class="text-secondary text-body1 text-weight-bolder text-no-wrap"
              >
                {{ $t(sys.label) }}
              </q-item-label>
              <q-item-label
                class="text-grey text-subtitle text-weight-bolder text-no-wrap"
              >
                {{ $t(sys.sublabel) }}
              </q-item-label>
            </q-item-section>
          </div>
        </q-checkbox>
      </q-item>
    </div>
  </div>
</template>
<script setup lang="ts">
import { System } from "../../../entities";
const emit = defineEmits(["some-exclusion"]);
const selectedSystems = ref([]);
const props = defineProps({
  iconsForExclusion: {
    type: Array<System>,
    default: [],
  },
});
watchEffect(() => {
  evitySystemForExclusion(selectedSystems.value);
});
function evitySystemForExclusion(selectedSystems: Array<System>) {
  emit("some-exclusion", selectedSystems);
}
</script>
