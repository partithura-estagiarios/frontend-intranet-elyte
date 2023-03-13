<template>
  <q-form>
    <q-input
      v-model="menu.menu_complement"
      :label="$t('text.menu.complement')"
      stack-label
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length > 0) || $t('warning.menuWarning.complement'),
      ]"
    />
    <q-input
      v-model="menu.menu_rice"
      :label="$t('text.menu.rice')"
      stack-label
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('warning.menuWarning.rice'),
      ]"
    />
    <q-input
      v-model="menu.menu_salad"
      :label="$t('text.menu.salad')"
      stack-label
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('warning.menuWarning.salad'),
      ]"
    />
    <q-input
      v-model="menu.menu_protein"
      :label="$t('text.menu.protein')"
      stack-label
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('warning.menuWarning.protein'),
      ]"
    />
    <q-input
      v-model="menu.menu_soup"
      :label="$t('text.menu.soup')"
      stack-label
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('warning.menuWarning.soup'),
      ]"
    />
    <q-input
      v-model="menu.menu_day"
      :label="$t('text.day')"
      stack-label
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('warning.menuWarning.day'),
      ]"
    />
    <q-input
      v-model="menu.menu_week"
      :label="$t('text.week')"
      stack-label
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('warning.menuWarning.week'),
      ]"
    />
    <q-card-actions align="right">
      <q-btn
        flat
        :label="$t('action.confirm.index')"
        color="primary"
        @click="emit('confirm', menu)"
      />
      <q-btn
        flat
        :label="$t('action.cancel.index')"
        color="primary"
        @click="emit('cancel')"
      />
    </q-card-actions>
  </q-form>
</template>

<script setup lang="ts">
const menu = reactive({
  menu_complement: "",
  menu_dessert: "",
  menu_protein: "",
  menu_salad: "",
  menu_rice: "",
  menu_soup: "",
  menu_week: "",
  menu_day: "",
});

const emit = defineEmits(["cancel", "confirm"]);
</script>
