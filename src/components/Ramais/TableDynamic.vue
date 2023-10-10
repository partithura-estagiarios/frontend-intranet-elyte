<script setup lang="ts">
const emit = defineEmits(["add"]);

const icon = computed((): any => {
  search.value ? "close" : "search";
});

const search = ref();
defineProps({
  columns: {
    default: () => [],
    type: Array,
  },
  rows: {
    default: () => [],
    type: Array,
  },
});
</script>

<template>
  <div class="q-ma-md">
    <q-table
      class="q-px-xl"
      :rows-per-page-label="t('text.rows_per_page')"
      :rows-per-page-options="[rows.length]"
      :grid="$q.screen.xs"
      :rows="rows"
      :columns="columns as any"
      :filter="search"
      row-key="name"
    >
      <template #top-right>
        <q-input
          v-model="search"
          :hint="$t('action.search.index')"
          debounce="300"
          dense
        >
          <template #append>
            <q-icon :name="icon" @click="search = null" />
          </template>
        </q-input>
      </template>

      <template #top-left>
        <slot name="top-left" />
      </template>

      <template v-slot:body-cell-actions="item">
        <q-td auto-width>
          <slot name="configButtons" :item="item.row" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
