<template>
  <div>
    <q-card class="q-mx-xl row justify-center shadow-7">
      <q-card-section class="q-my-md row full-width justify-center">
        <span
          class="text-uppercase border-title row text-h5 text-bold text-black"
        >
          {{ $t("titles.HrSystem") }}
        </span>
        <div class="absolute-right q-pa-md" v-if="userStorage.getToken">
          <ActionButton
            :buttons="actionButtons"
            :item="rhList"
            @reload="getListRh()"
            system="rh"
            @attSystem="getListRh()"
          />
        </div>
        <div class="absolute-left" v-if="userStorage.getToken">
          <BarSearch
            :system="'rh'"
            @some-system="(resultsSystem) => (rhList = resultsSystem)"
          />
        </div>
      </q-card-section>
      <Card :iconsForSystem="rhList" />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import GetSystem from "../../graphql/system/GetSystem.gql";
import { System } from "../../entities";
import { Ref } from "vue";
import actionButtons from "./actionButtons";

const rhList: Ref<System[]> = ref([]);

onMounted(() => {
  getListRh();
});

async function getListRh() {
  const { getSystem } = (await runMutation(GetSystem, {
    sistema: "rh",
  })) as unknown as Record<"getSystem", Array<System>>;

  rhList.value = getSystem;
  return rhList;
}
</script>
<style scoped>
.border-title {
  border-bottom: 5px solid;
  border-color: var(--q-primary);
}
</style>
