<template>
  <q-separator inset size="3px" color="primary" class="q-my-xl" />
  <div class="row item">
    <q-item
      v-for="icon in gestaoList"
      :key="icon.id"
      v-close-popup
      class="row flat"
      clickable
    >
      <q-avatar size="15rem">
        <q-img :src="icon.img" />
      </q-avatar>
      <q-btn
        flat
        class="text-black"
        target="blank"
        :to="icon.link"
        :label="icon.label"
      />
    </q-item>
  </div>
</template>

<script setup lang="ts">
const gestaoList = [
  {
    id: "1",
    img: "/public/icon/datasul1.png",
    label: "DataSul",
    link: "http:/totvs-login/loginForm",
  },
  {
    id: "2",
    img: "/public/icon/partithura.png",
    label: "Partithura",
    link: "elyte.partithura.app/dashboard/",
  },
  {
    id: "3",
    img: "/public/icon/datasul1.png",
    label: "Consulta de Estoque",
  },
  {
    id: "4",
    img: "/public/icon/datasul1.png",
    label: "CODI",
  },
  {
    id: "5",
    img: "/public/icon/datasul1.png",
    label: "Boa Idéia",
  },
  {
    id: "6",
    img: "/public/icon/datasul1.png",
    label: "Relatórios",
  },
];
</script>
