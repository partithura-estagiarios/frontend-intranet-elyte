<script setup lang="ts">
import createMenuItem from "../../../graphql/menu/CreateMenuItem.gql";

const props = defineProps({
  selected: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  systemType: {
    type: String,
    required: true,
  },
  systems: {
    type: Array,
    required: true,
  },
});
const check = ref(false);
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    @confirm=""
    :open="isActive"
    :title="$t('action.delSystem.index')"
  >
    <div class="row q-gutter-md q-pa-md">
      <span class="text-secondary text-h6 col-12 bg red q-pl-sm">{{
        $t("action.delSystem.message")
      }}</span>
      <div class="row max-size-list scroll">
        <q-item
          v-for="sys in systems"
          :key="sys.id"
          clickable
          target="_blank"
          class="row q-py-lg col-4 q-gutter-x-sm"
        >
          <q-checkbox v-model="check" />
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
        </q-item>
      </div>
    </div>
  </DynamicDialog>
</template>

<style scoped>
.max-size-list {
  max-height: 30vh;
}
</style>
