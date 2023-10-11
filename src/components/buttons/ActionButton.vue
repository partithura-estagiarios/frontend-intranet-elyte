<script setup lang="ts">
import { Action } from "../../entities/Action";
import { type Ref } from "vue";
import { number } from "yup";

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
  system: {
    type: String,
    default: "",
  },
});
const activedModal: Ref<number | null> = ref(null);
function activateModal(index: number) {
  if (!userStorage.user.getLoggedUser) {
    location.reload();
  }
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
        class="row fit q-gutter-x-xs items-center text-black"
        @click="activateModal(index)"
      >
        <component
          @reload="() => $emit('reload', deactivateModal())"
          @cancel="deactivateModal()"
          :isActive="activedModal === index"
          :is="button.component"
          :item="item"
          :system="system"
        />
        <q-icon :name="button.icon" color="primary" size="xs" />
        <span class="text-subtitle1">{{ button.label }}</span>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
