<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row text-black">
      <q-btn no-caps @click="$emit('today')" label="Hoje" />
      <q-btn no-caps @click="$emit('prev')" label="Anterior" />
      <q-btn no-caps @click="$emit('next')" label="Proximo" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "ScheduleNavigation",
});
</script>
