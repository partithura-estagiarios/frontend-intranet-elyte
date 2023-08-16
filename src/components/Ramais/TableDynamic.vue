<template>
  <div class="q-ma-md">
    <q-table
      class="q-px-xl"
      :rows-per-page-options="[10]"
      :grid="$q.screen.xs"
      :rows="props.rows"
      :columns="props.columns"
      :filter="search"
      row-key="name"
    >
      <template #top-right>
        <q-input
          v-model="search"
          :placeholder="$t('action.search.index')"
          debounce="300"
          dense
        >
          <template #append>
            <q-icon :name="icon" @click="search = ''" />
          </template>
        </q-input>
      </template>

      <template #top-left>
        <slot name="top-left"></slot>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";

const search = ref("");
const props = defineProps({
  columns: {
    default: () => [],
    type: Array,
  },
  rows: {
    default: () => [],
    type: Array,
  },
});

const icon = computed(() => {
  return search.value ? "close" : "search";
});
</script>
