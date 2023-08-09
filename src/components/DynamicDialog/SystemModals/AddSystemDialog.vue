<script setup lang="ts">
import AddSystem from "../../../graphql/menu/AddSystem.gql";
import { Menu } from "../../../entities";

const emits = defineEmits(["reload", "cancel"]);
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Array<Menu>,
    required: true,
  },
});
const ICON_LIBRARY_BASE_URL = "https://pictogrammers.com/library/mdi/";

const form = reactive({
  icon: "",
  label: "",
  sublabel: "",
  link: "",
  sistema: props.item[0].sistema,
});
async function createSystem() {
  try {
    await runMutation(AddSystem, { data: form });
    positiveNotify(t("notifications.success.createSystem"));
    emits("reload");
  } catch (err) {
    negativeNotify(t("notifications.fail.createSystem"));
  }
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    @confirm="createSystem"
    :open="isActive"
    :title="$t('action.addSystem.index')"
  >
    <div class="row q-pa-xl">
      <q-input
        class="col-6 q-px-xs"
        v-model="form.label"
        :label="$t('text.title')"
        :rules="[(val: string) => validateNotEmpty(val)]"
      />
      <q-input
        class="col-6 q-px-xs"
        v-model="form.icon"
        label="Icone"
        :rules="[(val: string) => validateNotEmpty(val)]"
      >
        <template #prepend>
          <q-item clickable target="_blank" :href="ICON_LIBRARY_BASE_URL">
            <q-icon class="col-sm-6" name="pageview">
              <q-tooltip anchor="top middle" self="bottom middle">
                <span class="text-subtitle2">{{ $t("label.search") }}</span>
              </q-tooltip>
            </q-icon>
          </q-item>
        </template>
      </q-input>

      <q-input
        class="col-6 q-px-xs"
        v-model="form.sublabel"
        label="Descrição"
        :rules="[(val: string) => validateNotEmpty(val)]"
      />
      <q-input
        class="col-6 q-px-xs"
        v-model="form.sistema"
        label="Sistema"
        :rules="[(val: string) => validateNotEmpty(val)]"
        disable
      />
      <q-input
        class="col-12 q-px-xs"
        v-model="form.link"
        label="Link"
        :rules="[(val: string) => validateNotEmpty(val)]"
      />
    </div>
  </DynamicDialog>
</template>
