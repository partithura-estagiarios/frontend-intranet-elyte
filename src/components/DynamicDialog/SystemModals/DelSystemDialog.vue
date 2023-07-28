<script setup lang="ts">
import { Menu } from "../../../entities";
import DeleteSystem from "../../../graphql/menu/DeleteSystem.gql";

defineProps({
  selected: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  systemType: {
    type: String,
    required: true,
  },
  systems: {
    type: Array<Menu>,
    required: true,
  },
});
const SINGULAR_TITLE = 1;
const PLURAL_TITLE = 2;
const selectedSystems = ref([]);

async function deleteSystem() {
  const verifyPlural =
    selectedSystems.value.length > SINGULAR_TITLE
      ? PLURAL_TITLE
      : SINGULAR_TITLE;
  if (selectedSystems.value.length >= 1) {
    try {
      await runMutation(DeleteSystem, { id: selectedSystems.value });
      positiveNotify(t("notifications.success.deleteSystem", verifyPlural));
    } catch (err) {
      negativeNotify(t("notifications.fail.deleteSystem.error", verifyPlural));
    }
    return;
  }
  negativeNotify(t("notifications.fail.deleteSystem.notSelected"));
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    @confirm="deleteSystem"
    :open="isActive"
    :title="$t('action.delSystem.index')"
  >
    <div class="row q-gutter-md q-pa-md">
      <span class="text-secondary text-h6 col-12 bg red q-pl-sm">{{
        $t("action.delSystem.message")
      }}</span>
      <div class="row max-size-list scroll fit">
        <q-item
          v-for="sys in systems"
          :key="sys.id"
          clickable
          target="_blank"
          class="row q-py-lg no-scroll col-4 q-gutter-x-sm"
        >
          <q-checkbox v-model="selectedSystems" :val="sys.id" class="">
            <div class="row q-gutter-x-sm">
              <q-avatar size="4rem">
                <q-icon class="fit" :name="sys.icon" color="secondary" />
              </q-avatar>

              <q-item-section class="q-mt-md">
                <q-item-label
                  class="text-secondary text-body1 text-weight-bolder text-no-wrap"
                >
                  {{ $t(sys.label) }}
                </q-item-label>
                <q-item-label
                  class="text-grey text-subtitle text-weight-bolder text-no-wrap"
                >
                  {{ $t(sys.sublabel) }}
                </q-item-label>
              </q-item-section>
            </div>
          </q-checkbox>
        </q-item>
      </div>
    </div>
  </DynamicDialog>
</template>

<style scoped>
.max-size-list {
  max-height: 30vh;
}
</style>
