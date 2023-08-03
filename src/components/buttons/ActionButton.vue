<script setup lang="ts">
import { Action } from "../../entities/Action";
import { type Ref } from "vue";

defineEmits(["reload"]);

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  buttons: {
    type: Array<Action>,
    default: () => [],
  },
});
const activedModal: Ref<number | null> = ref(null);

function activateModal(index: number) {
  activedModal.value = index;
}
function deactivateModal() {
  activedModal.value = null;
}
</script>

<template :props="item">
  <q-btn-dropdown
    color="secondary"
    flat
    dense
    rounded
    dropdown-icon="settings"
    no-icon-animation
  >
    <q-list v-for="(button, index) in buttons" :key="index" class="q-pa-xs">
      <q-item
        clickable
        class="row justify-start items-center q-gutter-xs text-black fit"
        @click="activateModal(index)"
      >
        <component
          @reload="() => $emit('reload')"
          @cancel="deactivateModal()"
          :isActive="activedModal === index"
          :is="button.component"
          :item="item"
        />
        <q-icon :name="button.icon" color="primary" />
        <span class="text-subtitle1">{{ button.label }}</span>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
