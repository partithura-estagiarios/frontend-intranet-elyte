<script setup lang="ts">
defineProps({
  selected: {
    type: String,
    default: "",
  },
  isActiveModal: {
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
  sistema: "",
});
</script>

<template>
  <DynamicDialog
    v-if="selected === 'add'"
    :open="isActiveModal"
    :title="$t('action.addSystem.index')"
  >
    <div class="row justify-between">
      <q-input
        class="col-sm-6 col-12 q-px-xs"
        v-model="form.label"
        label="Título"
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
    v-if="selected === 'delete'"
    :open="isActiveModal"
    :title="$t('action.delSystem.index')"
  >
    <span class="text-secondary text-h6">{{
      $t("action.delSystem.messageConfirm", { name: "" })
    }}</span
    ><!--Alterar name conforme selecionado-->
  </DynamicDialog>
</template>
