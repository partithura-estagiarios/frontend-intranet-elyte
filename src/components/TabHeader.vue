<template>
  <q-item class="row backgroundHeader">
    <q-toolbar-section class="q-ma-md row" clickable>
      <q-img src="../../public/images/logo.png" width="10rem" />
    </q-toolbar-section>
    <q-toolbar class="justify-center text-white">
      <q-toobar-section class="row">
        <q-tabs no-caps v-for="button in menuButtons" :key="button.id">
          <q-route-tab :label="button.label" :to="button.to" />
        </q-tabs>
      </q-toobar-section>
    </q-toolbar>
  </q-item>
</template>

<script setup lang="ts">
const menuButtons = [
  {
    id: 1,
    to: "home",
    label: "HOME",
  },
  {
    id: 2,
    to: "documentacao",
    label: "DOCUMENTAÇÃO SIG",
  },
  {
    id: 3,
    to: "rh",
    label: "RH DIVULGA",
  },
  {
    id: 4,
    to: "ramais",
    label: "RAMAIS",
  },
  {
    id: 4,
    to: "contato",
    label: "CONTATO",
  },
  {
    id: 5,
    to: "reuniao",
    label: "AGENDAR REUNIÃO",
  },
  {
    id: 6,
    to: "restaurante",
    label: "RESTAURANTE",
  },
  {
    id: 7,
    to: "certificacoes",
    label: "CERTIFICAÇÕES",
  },
];
</script>

<style scoped>
.backgroundHeader {
  background-color: #ff0321;
}
</style>
