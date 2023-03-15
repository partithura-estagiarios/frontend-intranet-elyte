<template>
  <div class="row justify-center">
    <q-form class="col-6">
      <q-input
        v-model="menu.salad"
        :label="$t('text.menu.salad')"
        filled
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.salad'),
        ]"
      />
      <q-input
        v-model="menu.rice"
        :label="$t('text.menu.rice')"
        filled
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.rice'),
        ]"
      />
      <q-input
        v-model="menu.complement"
        :label="$t('text.menu.complement')"
        filled
        stack-label
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || $t('warning.menuWarning.complement'),
        ]"
      />
      <q-input
        v-model="menu.soup"
        :label="$t('text.menu.soup')"
        filled
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.soup'),
        ]"
      />
      <q-input
        v-model="menu.protein"
        :label="$t('text.menu.protein')"
        filled
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.protein'),
        ]"
      />
      <q-input
        v-model="menu.dessert"
        :label="$t('text.menu.dessert')"
        filled
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.dessert'),
        ]"
      />
      <q-select
        v-model="menu.day"
        :options="options"
        filled
        label="Dia da semana"
        class="q-mb-md"
        :popup-content-style="{ color: 'black' }"
      />
      <q-input
        v-model="menu.week"
        :label="$t('text.week')"
        filled
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.week'),
        ]"
      />
      <q-card-actions>
        <q-btn
          flat
          :label="$t('action.confirm.index')"
          color="primary"
          @click="emit('confirm', menu)"
        />
      </q-card-actions>
    </q-form>
  </div>
</template>

<script setup lang="ts">
const menu = reactive({
  complement: "",
  dessert: "",
  protein: "",
  salad: "",
  rice: "",
  soup: "",
  week: "",
  day: "",
});

const options = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const emit = defineEmits(["confirm"]);
</script>

<style scoped>
.extra {
  color: blue !important;
}
</style>
