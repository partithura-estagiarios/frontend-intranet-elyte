<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row text-black">
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
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "ScheduleNavigation",
});
</script>
