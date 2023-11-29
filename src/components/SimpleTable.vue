<script setup lang="ts">
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  hidePagination: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  rowsPerPage: {
    type: Number,
    default: 0,
  },
  itemClass: {
    type: String,
    default: "",
  },
  pagination: {
    type: Object,
    default: null,
  },
  dynamicPagination: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="q-ma-md">
    <q-table
      class="q-px-xl"
      :grid="$q.screen.xs"
      :columns="columns"
      :rows="rows"
      :pagination="{ rowsPerPage: rowsPerPage }"
      :hide-pagination="hidePagination"
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

      <template #bottom v-if="$slots['append'] || props.dynamicPagination">
        <div class="full-width row justify-end">
          <TablePagination
            v-if="props.dynamicPagination"
            v-bind="props"
            @update:pagination="
              (pagination) => $emit('update:pagination', pagination)
            "
          />
          <tr v-if="$slots['append']">
            <td :colspan="columns.length" class="cell">
              <slot name="append" />
            </td>
          </tr>
        </div>
      </template>
    </q-table>
    <slot name="footer" />
  </div>
</template>
