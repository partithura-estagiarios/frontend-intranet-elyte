<script setup lang="ts">
import createMenuItem from "../../graphql/menu/CreateMenuItem.gql";

const props = defineProps({
  selected: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
const ICON_LIBRARY_BASE_URL = "https://pictogrammers.com/library/mdi/";
const form = reactive({
  icon: "",
  label: "",
  sublabel: "",
  link: "",
  sistema: "gestao",
});

async function createSystem() {
  try {
    const { data } = await runMutation(createMenuItem, { data: form });
    console.log(data);
    // const { token, user } = auth;
    // positiveNotify(t("notifications.success.login"));
  } catch (err) {
    // negativeNotify(t("notifications.fail.login"));
  }
}
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    @confirm="createSystem"
    v-if="selected === 'add'"
    :open="isActive"
    :title="$t('action.addSystem.index')"
  >
    <div class="row justify-between">
      <q-input
        class="col-sm-6 col-12 q-px-xs"
        v-model="form.label"
        :label="$t('text.title')"
      />
      <q-input
        class="col-sm-6 col-12 q-px-xs"
        v-model="form.icon"
        label="Icone"
      >
        <template #prepend>
          <q-item clickable :href="ICON_LIBRARY_BASE_URL" target="_blank">
            <q-icon class="col-sm-6 col-12" name="pageview">
              <q-tooltip anchor="top middle" self="bottom middle">
                <span class="text-subtitle2">Procurar </span>
              </q-tooltip>
            </q-icon>
          </q-item>
        </template>
      </q-input>
      <q-input
        class="col-6 q-px-xs"
        v-model="form.sublabel"
        label="Descrição"
      />
      <q-input class="col-6 q-px-xs" v-model="form.sistema" label="Sistema" />
      <q-input class="col-12 q-px-xs" v-model="form.link" label="Link" />
    </div>
  </DynamicDialog>

  <DynamicDialog
    @cancel="() => $emit('cancel')"
    v-if="selected === 'delete'"
    :open="isActive"
    :title="$t('action.delSystem.index')"
  >
    <span class="text-secondary text-h6">{{
      $t("action.delSystem.messageConfirm", { name: "" })
    }}</span
    ><!--Alterar name conforme selecionado-->
  </DynamicDialog>
</template>
