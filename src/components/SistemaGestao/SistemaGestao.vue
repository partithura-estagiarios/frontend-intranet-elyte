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
      </q-card-section>

      <q-card-section class="row col-12 justify-around">
        <q-item
          v-for="icon in gestaoList"
          :key="icon.id"
          class="column col-4 q-my-md items-center color-grey"
          clickable
          :href="icon.link"
          target="_blank"
        >
          <q-item-section wrap class="relative">
            <q-avatar size="7rem">
              <q-icon
                class="border icon border-radius-inherit q-pa-md"
                size="4rem"
                :name="icon.icon"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section class="q-mt-md">
            <q-item-label
              class="text-grey-8 text-h6 text-weight-bolder text-no-wrap"
            >
              {{ $t(icon.label) }}
            </q-item-label>
            <q-item-label class="text-grey text-weight-bolder text-no-wrap">
              {{ $t(icon.sublabel) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
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
  const { menuBySystem } = (await runMutation(GetSystem, {
    sistema: "gestao",
  })) as unknown as Record<"menuBySystem", Array<System>>;

  gestaoList.value = menuBySystem;
  return gestaoList;
}
</script>

<style scoped>
.border {
  border: 8px solid;
  border-color: rgb(164, 164, 164, 0.4);
}

.border-title {
  border-bottom: 5px solid;
  border-color: var(--q-primary);
}

.icon {
  color: rgb(164, 164, 164, 0.4);
}

.icon:hover {
  color: var(--q-primary);
}

.border:hover {
  border-color: var(--q-primary);
}
</style>
