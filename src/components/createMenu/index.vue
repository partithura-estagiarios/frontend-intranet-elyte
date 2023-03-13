<template>
  <span>$t(titles.menu)</span>
  <div class="full-width column items-center">
    <q-form>
      <q-input
        v-model="menu.complement"
        :label="$t('text.menu.complement')"
        class="tamanho"
        stack-label
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || $t('warning.menuWarning.complement'),
        ]"
      />
      <q-input
        v-model="menu.rice"
        :label="$t('text.menu.rice')"
        class="tamanho"
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.rice'),
        ]"
      />
      <q-input
        v-model="menu.salad"
        :label="$t('text.menu.salad')"
        class="tamanho"
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.salad'),
        ]"
      />
      <q-input
        v-model="menu.protein"
        :label="$t('text.menu.protein')"
        class="tamanho"
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.protein'),
        ]"
      />
      <q-input
        v-model="menu.soup"
        :label="$t('text.menu.soup')"
        class="tamanho"
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.soup'),
        ]"
      />
      <q-input
        v-model="menu.day"
        :label="$t('text.day')"
        class="tamanho"
        stack-label
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || $t('warning.menuWarning.day'),
        ]"
      />
      <q-input
        v-model="menu.week"
        :label="$t('text.week')"
        class="tamanho"
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
          @click="'confirm', menu"
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
</script>

<style scoped>
.tamanho {
  width: 20rem;
}
</style>
