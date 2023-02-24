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
        <q-btn outline color="primary" class="border" @click="emit('add')">
          <q-icon class="q-mr-sm" name="add" color="red" />
          <span>{{ $t("action.addRamal.index") }}</span>
        </q-btn>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import GetRamais from "../../graphql/ramais/getRamais.gql";
import { useQuery } from "villus";

const emit = defineEmits(["add"]);

const icon = computed(() => {
  if (search.value) {
    return "close";
  }
  return "search";
});

const { data } = useQuery({ query: GetRamais });

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
