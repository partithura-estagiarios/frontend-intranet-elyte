<script lang="ts">
import { defineComponent, ref, computed, watchEffect, onMounted } from "vue";

export default defineComponent({
  name: "TablePagination",
  props: {
    pagination: {
      type: Object,
      default: null,
    },
  },
  emits: ["update:pagination"],
  setup(props, { emit }) {
    const currentPage = ref(0);
    const max = ref(0);
    const pages = ref(0);
    const total = ref(0);

    function calculatePages(total: number, limit: number): number {
      return Math.ceil(total / limit);
    }

    function refreshPagination(): void {
      currentPage.value = props.pagination.currentPage + 1;
      max.value = props.pagination.limit;
      total.value = props.pagination.total;
      pages.value = calculatePages(
        props.pagination.total,
        props.pagination.limit
      );
    }
    onMounted(() => {
      refreshPagination();
    });

    watchEffect(() => {
      if (props.pagination) {
        refreshPagination();
      }
    });

    function updateLimit(): void {
      emit("update:pagination", { page: 0, limit: max.value });
    }

    function updatePage(): void {
      emit("update:pagination", {
        page: currentPage.value - 1,
        limit: max.value,
      });
    }

    return {
      currentPage,
      max,
      total,
      pages,
      updateLimit,
      updatePage,
    };
  },
});
</script>

<template>
  <div class="row q-gutter-md items-center">
    <q-pagination
      v-model="currentPage"
      :max="pages"
      input
      @update:model-value="updatePage"
      class="text-grey"
      color="black"
    />
  </div>
</template>

<style scoped>
.strip {
  background-color: rgba(82, 72, 72, 0.05);
}
</style>
