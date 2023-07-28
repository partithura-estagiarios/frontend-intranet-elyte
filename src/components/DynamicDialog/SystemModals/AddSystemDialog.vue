<script setup lang="ts">
import createMenuItem from "../../../graphql/menu/CreateMenuItem.gql";

const props = defineProps({
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
});
const ICON_LIBRARY_BASE_URL = "https://pictogrammers.com/library/mdi/";
const form = reactive({
  icon: "",
  label: "",
  sublabel: "",
  link: "",
  sistema: props.systemType,
});

async function createSystem() {
  try {
    const { data } = await runMutation(createMenuItem, { data: form });
    console.log(data);
    positiveNotify(t("notifications.success.createSystem"));
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
    <div class="column q-pa-lg">
      <div class="row">
        <q-input class="col-6" v-model="form.label" :label="$t('text.title')" />
        <q-input class="col-6 q-px-xs" v-model="form.icon" label="Icone">
          <template #prepend>
            <q-item clickable :href="ICON_LIBRARY_BASE_URL" target="_blank">
              <q-icon class="col-sm-6 col-12" name="pageview">
                <q-tooltip anchor="top middle" self="bottom middle">
                  <span class="text-subtitle2">{{ $t("label.search") }}</span>
                </q-tooltip>
              </q-icon>
            </q-item>
          </template>
        </q-input>
      </div>

      <div class="row">
        <q-input
          class="col-6 q-px-xs"
          v-model="form.sublabel"
          label="Descrição"
        />
        <q-input
          class="col-6 q-px-xs"
          v-model="form.sistema"
          label="Sistema"
          disable
        />
      </div>
      <q-input class="col-9 q-px-xs" v-model="form.link" label="Link" />
    </div>
  </DynamicDialog>
</template>
