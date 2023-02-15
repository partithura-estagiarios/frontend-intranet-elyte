<template>
  <div>
    <q-card class="q-mx-lg row justify-center shadow-7">
      <q-card-section class="q-my-md">
        <span class="text-black row font text-bold">
          {{ $t("titles.ManagementSystem") }}
          <q-icon
            color="primary"
            class="q-ml-sm"
            name="engineering"
            size="2rem"
          />
        </span>
        <q-separator size="0.5rem" color="primary" class="bar-style" />
      </q-card-section>
      <q-card-section class="row">
        <q-item
          v-for="icon in gestaoList"
          :key="icon.id"
          class="column col-3 q-my-md items-center"
          clickable
        >
          <q-item-section avatar>
            <q-avatar size="7rem">
              <q-icon class="border" :name="icon.img" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-black">
              {{ $t(icon.label) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
const gestaoList = [
  {
    id: "1",
    img: "/public/icon/datasulIcon.png",
    label: "titles.SubTitlesManagement.DataSul",
    link: "http:/totvs-login/loginForm",
  },
  {
    id: "2",
    img: "/public/icon/partithuraIcon.png",
    label: "titles.SubTitlesManagement.Partithura",
    link: "elyte.partithura.app/dashboard/",
  },
  {
    id: "3",
    img: "/public/icon/datasulIcon.png",
    label: "titles.SubTitlesManagement.DataSulPrototype",
  },
  {
    id: "4",
    img: "/public/icon/codiIncon.png",
    label: "titles.SubTitlesManagement.StockQuery",
  },
  {
    id: "5",
    img: "/public/icon/datasulIcon.png",
    label: "titles.SubTitlesManagement.CODI",
  },
  {
    id: "6",
    img: "/public/icon/datasulIcon.png",
    label: "titles.SubTitlesManagement.GoodIdea",
  },
  {
    id: "7",
    img: "rate_review",
    label: "titles.SubTitlesManagement.Reports",
  },
  {
    id: "8",
    img: "settings",
    label: "titles.SubTitlesManagement.ProcessMapping",
  },
  {
    id: "9",
    img: "settings",
    label: "titles.SubTitlesManagement.FtWeb",
  },
];
</script>

<style scoped>
.border {
  border: 8px solid;
  border-radius: 50%;
  padding: 0.3rem;
  color: rgb(255, 0, 0);
  width: 4.5rem;
  height: 4.5rem;
}

.border:hover {
  color: rgb(121, 184, 71);
}
.bar-style {
  border-radius: 10px;
}

.font {
  font-size: 1.6rem;
}
.borderRad {
  border-radius: 60px;
}
</style>
