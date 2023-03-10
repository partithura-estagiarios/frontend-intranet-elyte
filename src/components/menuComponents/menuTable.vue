<template>
  <div id="q-app">
    <div class="q-pa-md">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[7]"
        hide-bottom
        class="q-pt-xl"
        table-header-style="font-weight: bold"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const columns = [
  { name: "Dia", label: "Dia", field: "dia" },
  { name: "Salada", label: "Salada", field: "salada" },
  { name: "Proteína", label: "Proteína", field: "proteina" },
  { name: "Carboidrato", label: "Carboidrato", field: "carboidrato" },
  { name: "Sobremesa", label: "Sobremesa", field: "sobremesa" },
];

const rows = [
  {
    dia: "Segunda",
    salada: "Salada",
    proteina: "Frango e Lasanha",
    carboidrato: "Polenta cremosa",
    sobremesa: "Sobremesa",
  },
  {
    dia: "Terça",
    salada: "Salada",
    proteina: "Copa Lombo Grelhado e Moela ao Molho",
    carboidrato: "Aipim no vapor",
    sobremesa: "Sobremesa",
  },
  {
    dia: "Quarta",
    salada: "Salada",
    proteina: "Enroladinho de salsicha e Frango ao molho",
    carboidrato: "Massa espaguete",
    sobremesa: "Sobremesa",
  },
  {
    dia: "Quinta",
    salada: "Salada",
    proteina: "Frango grelhado e rondeli de frios",
    carboidrato: "Pure de batata",
    sobremesa: "Sobremesa",
  },
  {
    dia: "Sexta",
    salada: "Salada",
    proteina: "Salsichão Assado e Copa Lombo grelhado",
    carboidrato: "Farofa",
    sobremesa: "Sobremesa",
  },
  {
    dia: "Sabádo",
    salada: "-",
    proteina: "-",
    carboidrato: "-",
    sobremesa: "-",
  },
  {
    dia: "Domingo",
    salada: "-",
    proteina: "-",
    carboidrato: "-",
    sobremesa: "-",
  },
];
</script>
