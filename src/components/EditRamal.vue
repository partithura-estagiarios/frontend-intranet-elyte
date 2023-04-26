<template>
  <DynamicDialog :title="$t('action.editRamal.index')" v-bind="item">
    <q-form>
      <q-input
        v-model="item.ramal_user"
        :label="$t('text.name')"
        stack-label
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('warning.ramalName')]"
      />
      <q-input
        v-model="item.sector_user"
        :label="$t('text.sector')"
        stack-label
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('warning.ramalSector')]"
      />
      <q-input
        v-model="item.ramal_number"
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
          @click="emit('confirm', item)"
        />
        <q-btn
          flat
          :label="$t('action.cancel.index')"
          color="primary"
          @click="emit('cancel')"
        />
      </q-card-actions>
    </q-form>
  </DynamicDialog>
</template>

<script lang="ts" setup>
const emit = defineEmits(["cancel", "confirm"]);

defineProps({
  item: Object,
});
</script>
