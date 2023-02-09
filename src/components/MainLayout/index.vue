<template>
  <HomeBanner class="q-mb-xl" />
  <q-splitter
    v-model="initialWidth"
    :limits="[50, 50]"
    before-class="overflow-hidden"
    after-class="overflow-hidden"
  >
    <template v-slot:before>
      <span class="text-black font text-bold q-my-lg"
        >{{ gestao }}
        <q-separator inset size="0.5rem" color="primary" class="bar-style" />
      </span>
      <SistemaGestao class="q-mt-xl" />
    </template>

    <template v-slot:after>
      <span class="text-black font text-bold q-my-lg"
        >{{ rh }}
        <q-separator inset size="0.5rem" color="primary" class="bar-style" />
      </span>
      <SistemaGestao class="q-mt-xl" />
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
const initialWidth = ref(50);
const gestao = ref("Sistema de Gestão");
const rh = ref("Sistema de RH");
</script>

<style scoped>
.font {
  font-size: 2rem;
}

.bar-style {
  border-radius: 10px;
}
</style>
