<script setup lang="ts">
const menuItems = [
  { label: "Editar", icon: "mode" },
  { label: "Adicionar", icon: "add" },
  { label: "Deletar", icon: "delete" },
];
</script>

<template>
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
      <q-list class="color no-scroll">
        <q-item
          v-for="item in menuItems"
          class="row items-center q-gutter-x-xs"
          v-close-popup
        >
          <q-icon :name="item.icon" size="xs" color="primary" />
          <span class="text-subtitle1">{{ item.label }}</span>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<style scoped>
.color {
  color: #6e6e6e;
}
.border {
  border: 1px solid;
  border-color: var(--q-primary);
}
</style>
