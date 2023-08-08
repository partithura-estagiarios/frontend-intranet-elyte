<template>
  <div>
    <q-card class="q-mx-xl row justify-center shadow-7">
      <q-card-section class="q-my-md row full-width justify-center">
        <span
          class="text-uppercase border-title row text-h5 text-bold text-black"
        >
          {{ $t("titles.HrSystem") }}
        </span>
        <div class="absolute-right q-pa-md" v-if="userStorage.isLoggedIn">
          <ActionButton
            :buttons="buttons"
            :item="rhList"
            @reload="getListRh()"
          />
        </div>
      </q-card-section>

      <q-card-section class="row col-12 justify-around">
        <q-item
          v-for="icon in rhList"
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
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { Menu } from "../../entities";
import { Ref } from "vue";
import { Action } from "../../entities/Action";
import AddSystemDialog from "../DynamicDialog/SystemModals/AddSystemDialog.vue";
import EditSystemDialog from "../DynamicDialog/SystemModals/EditSystemDialog.vue";
import DelSystemDialog from "../DynamicDialog/SystemModals/DelSystemDialog.vue";

const rhList: Ref<Menu[]> = ref([]);

onMounted(() => {
  getListRh();
});

async function getListRh() {
  const { menuBySystem } = (await runMutation(GetMenu, {
    sistema: "rh",
  })) as unknown as Record<"menuBySystem", Array<Menu>>;

  rhList.value = menuBySystem;
  return rhList;
}

const buttons: Action[] = [
  { label: t("action.add"), icon: "add", component: AddSystemDialog },
  { label: t("action.edit"), icon: "edit", component: EditSystemDialog },
  { label: t("action.delete"), icon: "delete", component: DelSystemDialog },
];
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
