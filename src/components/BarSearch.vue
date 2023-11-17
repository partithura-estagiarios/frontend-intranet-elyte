<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-input
        v-model="search"
        debounce="500"
        filled
        placeholder="Digite um Sistema"
        @keyup.enter="searchSystem(search)"
      >
        <template v-slot:before>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["some-system"]);

function getSearchSystem(resultsSystem: Array<System>) {
  emit("some-system", resultsSystem);
}
const props = defineProps({
  system: {
    type: String,
    default: "",
  },
});
import { System } from "../entities";
import SearchSystem from "../graphql/system/SearchSystem.gql";
const search = ref("");
async function searchSystem(search: string) {
  const result = await runQuery(SearchSystem, {
    word: search,
    tableSystem: props.system,
  });
  if (Array.isArray(result.searchSystem)) {
    getSearchSystem(result.searchSystem as Array<System>);
  }
  return console.error("searchSystem result is not an array:");
}
</script>
<style scoped>
.q-pa-md {
  max-width: 210px;
}
</style>
