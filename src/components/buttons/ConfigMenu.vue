<script setup lang="ts">
import { Menu } from "../../entities";

defineProps({
  system: {
    type: String,
    required: true,
  },
  systemList: {
    type: Array<Menu>,
    required: true,
  },
});

const isActiveModal = ref(false);
const selectedModel = ref("");
const menuItems = [
  { label: "Adicionar", icon: "add", model: "add" },
  { label: "Deletar", icon: "delete", model: "delete" },
];

const statusModal = (model: string): void => {
  selectedModel.value = model;
  isActiveModal.value = !isActiveModal.value;
};
</script>

<template>
  <AddSystemDialog
    v-if="selectedModel === 'add'"
    :system-type="system"
    :isActive="isActiveModal"
    @cancel="isActiveModal = false"
  />
  <DelSystemDialog
    v-if="selectedModel === 'delete'"
    :system-type="system"
    :isActive="isActiveModal"
    @cancel="isActiveModal = false"
    :systems="systemList"
  />

  <div
    v-show="$route.fullPath.includes('/admin')"
    class="col-12 col-md-4 row justify-end"
  >
    <q-btn-dropdown
      color="secondary"
      flat
      rounded
      dropdown-icon="settings"
      no-icon-animation
    >
      <q-list v-for="item in menuItems" class="text-secondary no-scroll">
        <q-item
          clickable
          @click="statusModal(item.model)"
          class="row items-center q-gutter-x-xs"
        >
          <q-icon :name="item.icon" size="xs" color="primary" />
          <span class="text-subtitle1">{{ item.label }}</span>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>
