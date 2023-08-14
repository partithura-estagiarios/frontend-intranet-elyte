<script setup lang="ts">
import { type Menu } from "../../../entities";

import UpdateSystem from "../../../graphql/menu/UpdateSystem.gql";

const emits = defineEmits(["reload", "cancel"]);
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Array<Menu>,
    required: true,
  },
});
const selectedSystem = ref<object>({});

const getSelectedSystem = (system: Menu) => {
  selectedSystem.value = system;
};

const form: Omit<Menu, "id"> = reactive({
  icon: "",
  label: "",
  link: "",
  sistema: "",
  sublabel: "",
});

watch(selectedSystem, (newValue: Menu) => {
  form.icon = newValue.icon;
  form.label = newValue.label;
  form.link = newValue.link;
  form.sistema = newValue.sistema;
  form.sublabel = newValue.sublabel;
});

async function updateSystem() {
  try {
    await runMutation(UpdateSystem, {
      id: selectedSystem.value.id,
      data: form,
    });
    positiveNotify(t("notifications.success.editSystem"));
    emits("reload");
  } catch (err) {
    negativeNotify(t("notifications.fail.editSystem"));
  }
}
</script>

<template>
  <DynamicDialog
    @cancel="() => [$emit('cancel'), (selectedSystem = {})]"
    @confirm="updateSystem"
    :open="isActive"
    :title="$t('action.editSystem.index')"
  >
    <div
      v-if="Object.keys(selectedSystem).length < 1"
      class="row q-gutter-md q-pa-md"
    >
      <span class="text-secondary text-h6 q-pl-sm">{{
        $t("action.editSystem.message")
      }}</span>
      <div class="row max-size-list scroll fit">
        <q-item
          v-for="sys in item"
          :key="sys.id"
          clickable
          target="_blank"
          class="row q-py-lg col-4 no-scroll item"
          @click="getSelectedSystem(sys)"
        >
          <div class="row fit q-gutter-x-sm">
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
        </q-item>
      </div>
    </div>

    <div v-else class="row q-pa-xl">
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
          <q-item clickable target="_blank">
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

<style scoped>
.max-size-list {
  max-height: 30vh;
}
.item:hover {
  background-color: rgb(164, 164, 164, 0.2);
}
</style>
