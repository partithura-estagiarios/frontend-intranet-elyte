<template>
  <q-form class="items-center column" ref="myForm">
    <q-input
      v-model="menu.salad"
      :label="$t('text.menu.salad')"
      class="q-mx-xl tamanho"
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
      class="q-mx-xl tamanho"
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
      class="q-mx-xl tamanho"
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
      class="q-mx-xl tamanho"
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
      class="q-mx-xl tamanho"
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
      class="q-mx-xl tamanho"
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
      class="q-mx-xl tamanho"
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
      class="q-mx-xl tamanho"
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
