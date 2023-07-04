<template>
  <div>
    <q-card class="q-mx-lg row justify-center shadow-7">
      <q-card-section class="q-my-md">
        <span class="text-uppercase row text-h5 text-bold text-black">
          {{ $t("titles.ManagementSystem") }}
          <q-icon
            color="primary"
            class="q-ml-sm"
            name="engineering"
            size="2rem"
          />
        </span>
        <q-separator
          size="0.5rem"
          color="primary"
          class="border-radius-inherit"
        />
      </q-card-section>
      <q-card-section class="row col-12 justify-around">
        <q-item
          v-for="icon in gestaoList"
          :key="icon.id"
          class="column col-4 q-my-md items-center"
          clickable
          :href="icon.link"
        >
          <q-item-section wrap>
            <q-avatar size="7rem">
              <q-icon
                class="border icon border-radius-inherit q-pa-md"
                size="4rem"
                :name="icon.icon"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section class="q-mt-md">
            <q-item-label class="text-red text-weight-bolder text-no-wrap">
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
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { Menu } from "../../entities";
import { Ref } from "vue";

const gestaoList: Ref<Menu[]> = ref([]);

onMounted(() => {
  getGestaoList();
});

async function getGestaoList() {
  const { menuBySystem } = (await runMutation(GetMenu, {
    sistema: "gestao",
  })) as unknown as Record<"menuBySystem", Array<Menu>>;

  gestaoList.value = menuBySystem;
  return gestaoList;
}
</script>

<style scoped>
.border {
  border: 8px solid;
  border-color: rgb(164, 164, 164);
}

.icon:hover {
  color: rgb(229, 57, 53);
}

.border:hover {
  border-color: rgb(229, 57, 53);
}
</style>
