<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <DynamicDialog
    @cancel="() => $emit('cancel')"
    :open="isActive"
    :title="item.description"
    closeLabel="Fechar"
    close
  >
    <div class="column q-px-lg q-py-md text-black text-body1 q-gutter-md">
      <span class="text-h6">Informações</span>
      <span>
        <q-icon name="person" />
        Nome:
        {{ item.userCreated }}
      </span>
      <span>
        <q-icon name="schedule" />
        Horário:
        {{ item.initialTime }}
      </span>

      <q-separator />

      <div class="column q-gutter-y-md">
        <span class="text-h6">Material de apoio</span>
        <span>
          <q-icon name="computer" />
          Computador:
          {{ item.suport.computer }}
        </span>
        <span>
          <q-icon name="videocam" />
          Projetor:
          {{ item.suport.computer }}
        </span>
      </div>
    </div>
  </DynamicDialog>
</template>
