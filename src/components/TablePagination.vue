<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, watchEffect } from "vue";

const props = defineProps({
  pagination: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:pagination"]);

const currentPage = ref(0);
const max = ref(0);
const pages = ref(0);
const total = ref(0);

function calculatePages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}

function refreshPagination(): void {
  if (props.pagination) {
    currentPage.value = props.pagination.currentPage + 1;
    max.value = props.pagination.limit;
    total.value = props.pagination.total;
    pages.value = calculatePages(
      props.pagination.total,
      props.pagination.limit
    );
  }
}

onMounted(() => {
  refreshPagination();
});

watchEffect(() => {
  refreshPagination();
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
