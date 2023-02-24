<template>
  <q-form>
    <q-input
      v-model="ramal.ramal_user"
      :label="$t('text.name')"
      stack-label
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || $t('warning.ramalName')]"
    />
    <q-input
      v-model="ramal.sector_user"
      :label="$t('text.sector')"
      stack-label
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || $t('warning.ramalSector')]"
    />
    <q-input
      v-model="ramal.ramal_number"
      :label="$t('text.number')"
      stack-label
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || $t('warning.ramalNumber')]"
    />
    <q-card-actions align="right">
      <q-btn
        flat
        :label="$t('action.confirm.index')"
        color="primary"
        @click="emit('confirm', ramal)"
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
const ramal = reactive({
  ramal_user: "",
  sector_user: "",
  ramal_number: "",
});

const emit = defineEmits(["cancel", "confirm"]);
</script>
