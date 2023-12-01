<script setup lang="ts">
const prop = defineProps({
  menus: {
    type: Array,
    default: [],
  },
  tableColumns: {
    type: Array,
    default: [],
  },
  paginationData: {
    type: Object,
    default: {},
  },
  applyPagination: {
    type: Function,
    default: () => {},
  },
  updatePage: {
    type: Function,
    default: () => {},
  },
  pages: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 0,
  },
  openModal: {
    type: Function,
    default: () => {},
  },
});
</script>

<template>
  <div class="full-width">
    <div v-if="prop.menus">
      <SimpleTable
        :rows="menus"
        :columns="prop.tableColumns"
        is-flat
        :pagination="prop.paginationData"
        dynamic-pagination
        @update:pagination="prop.applyPagination"
      >
        <template #configButtons="props">
          <EditMenu :open-modal="prop.openModal" />
        </template>

        <template #bottom>
          <div class="full-width row justify-end">
            <q-pagination
              color="grey"
              v-model="prop.currentPage"
              :max="prop.pages"
              input
              @update:model-value="prop.updatePage"
            />
            <tr v-if="$slots['append']">
              <td :colspan="columns.length" class="cell">
                <slot name="append" />
              </td>
            </tr>
          </div>
        </template>
      </SimpleTable>
    </div>
  </div>
</template>
