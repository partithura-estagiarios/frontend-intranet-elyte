<template>
  <div class="items-center column q-mt-xl" style="max-width: 1800px">
    <q-input
      v-model="menu.salad"
      :label="$t('text.menu.salad')"
      class="tamanho q-mx-xl"
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
      class="tamanho q-mx-xl"
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
      class="tamanho q-mx-xl"
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
      class="tamanho q-mx-xl"
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
      class="tamanho q-mx-xl"
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
      class="tamanho q-mx-xl"
      filled
      stack-label
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('warning.menuWarning.dessert'),
      ]"
    />
    <q-input
      v-model="menu.day"
      :label="$t('text.day')"
      class="tamanho q-mx-xl"
      type="date"
      filled
      stack-label
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('warning.menuWarning.day'),
      ]"
    />
    <q-input
      v-model="menu.week"
      :label="$t('text.week')"
      class="tamanho q-mx-xl"
      filled
      stack-label
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('warning.menuWarning.week'),
      ]"
    />
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

const emit = defineEmits(["confirm"]);
</script>

<style scoped>
.tamanho {
  width: 40rem;
}
</style>
