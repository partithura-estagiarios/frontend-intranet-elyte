<script lang="ts">
import { QTableColumn, QTableProps } from "quasar";
import { defineComponent } from "vue";

import TablePagination from "../components/pagination/Index.vue";

export default defineComponent({
  name: "SimpleTable",
  props: {
    columns: {
      type: Array<QTableColumn>,
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

      <template #bottom v-if="$slots['append'] || dynamicPagination">
        <div class="full-width row justify-end">
          <TablePagination
            v-if="dynamicPagination"
            v-bind="$props"
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

<style scoped>
.strip {
  background-color: rgba(82, 72, 72, 0.05);
}
</style>

<!-- <template>
  <div class="text-center">
    <span class="text-primary text-h6" v-if="title">{{ title }}</span>
    <q-table
      :columns="columns"
      :rows="rows"
      :dense="isDense"
      :flat="isFlat"
      :pagination="{ rowsPerPage: rowsPerPage }"
      :sort-method="sort"
      :hide-pagination="hidePagination"
      :separator="separator"
    >
      <template #body="props">
        <q-tr
          :props="props"
          :class="${props.rowIndex % 2 || 'strip'} ${itemClass}"
          @click="$emit('row-click', props.row)"
        >
          <q-td v-for="col in props.cols" :key="col.index">
            <slot :name="item-${col.field}" v-bind="props.row">
              {{ col.value }}
            </slot>
          </q-td>
        </q-tr>

        <tr v-if="$slots['expanded-item']">
          <td :colspan="columns.length" class="text-left">
            <slot v-bind="{ row: props.row }" name="expanded-item" />
          </td>
        </tr>
      </template>

      <template #bottom v-if="$slots['append'] || dynamicPagination">
        <div class="full-width row justify-end">
          <TablePagination
            v-if="dynamicPagination"
            v-bind="$props"
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
</template> -->
