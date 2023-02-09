<template>
  <div class="row side">
    <q-item
      v-for="icon in gestaoList"
      :key="icon.id"
      class="row col-5 q-mx-lg"
      clickable
    >
      <q-item-section avatar>
        <q-avatar size="6rem">
          <q-img class="border" :src="icon.img" />
        </q-avatar>
      </q-item-section>

      <q-item-section side>
        <q-item-label class="text-black">
          {{ icon.label }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup lang="ts">
const gestaoList = [
  {
    id: "1",
    img: "/public/icon/datasulIcon.png",
    label: "DataSul",
    link: "http:/totvs-login/loginForm",
  },
  {
    id: "2",
    img: "/public/icon/partithuraIcon.png",
    label: "Partithura",
    link: "elyte.partithura.app/dashboard/",
  },
  {
    id: "3",
    img: "/public/icon/datasulIcon.png",
    label: "Consulta de Estoque",
  },
  {
    id: "4",
    img: "/public/icon/codiIncon.png",
    label: "CODI",
  },
  {
    id: "5",
    img: "/public/icon/datasulIcon.png",
    label: "Boa Idéia",
  },
  {
    id: "6",
    img: "/public/icon/datasulIcon.png",
    label: "Relatórios",
  },
];
</script>

<style scoped>
.border {
  border: 10px solid;
  color: #f0f0ef;
  border-radius: 50%;
}

.border:hover {
  color: red;
}
</style>
