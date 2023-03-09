<template>
  <div class="q-ma-md">
    <q-table
      class="q-px-xl"
      :rows-per-page-options="[10]"
      :grid="$q.screen.xs"
      :rows="props.rows"
      :columns="columns"
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
            <q-icon :name="icon" @click="search = null" />
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
const icon = computed(() => {
  search.value ? "close" : "search";
});

const search = ref();
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
});
</script>
