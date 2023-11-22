<template>
  <div>
    <q-card class="q-mx-xl row justify-center shadow-7">
      <q-card-section class="q-my-md row full-width justify-center">
        <span
          class="text-uppercase border-title row text-h5 text-bold text-black"
        >
          {{ $t("titles.ManagementSystem") }}
        </span>
        <div class="absolute-right q-pa-md" v-if="userStorage.getToken">
          <ActionButton
            :buttons="actionButtons"
            :item="gestaoList"
            @reload="getGestaoList()"
            system="gestao"
          />
        </div>
        <div class="absolute-left" v-if="userStorage.getToken">
          <BarSearch
            :system="'gestao'"
            @some-system="(resultsSystem) => (gestaoList = resultsSystem)"
          />
        </div>
      </q-card-section>
      <Card :iconsForSystem="gestaoList" />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import GetSystem from "../../graphql/system/GetSystem.gql";
import { System } from "../../entities";
import { Ref } from "vue";
import actionButtons from "./actionButtons";

const gestaoList: Ref<System[]> = ref([]);

onMounted(() => {
  getGestaoList();
});

async function getGestaoList() {
  const { getSystem } = (await runMutation(GetSystem, {
    sistema: "gestao",
  })) as unknown as Record<"getSystem", Array<System>>;

  gestaoList.value = getSystem;
  return gestaoList;
}
</script>

<style scoped>
.border-title {
  border-bottom: 5px solid;
  border-color: var(--q-primary);
}
</style>
