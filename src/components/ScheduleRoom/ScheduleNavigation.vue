<script setup lang="ts">
const activedModal = ref(false);
</script>

<template>
  <AddSchedule :is-active="activedModal" @cancel="activedModal = false" />

  <div class="row justify-between fit">
    <div class="row q-pa-md q-gutter-sm text-black">
      <q-btn-group>
        <q-btn no-caps @click="$emit('prev')" label="Anterior" />
        <q-btn no-caps @click="$emit('today')" label="Hoje" />
        <q-btn no-caps @click="$emit('next')" label="Proximo" />
      </q-btn-group>

      <q-btn-group>
        <q-btn no-caps label="Ano" />
        <q-btn no-caps label="Mês" />
        <q-btn no-caps label="Semana" />
        <q-btn no-caps label="Dia" />
      </q-btn-group>
    </div>

    <div class="column justify-center">
      <q-btn no-caps label="Agendar evento" @click="activedModal = true" />
    </div>
  </div>
</template>
