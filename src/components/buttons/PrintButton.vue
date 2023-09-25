<template>
  <q-btn
    icon="print"
    class="row q-mt-md hide-print"
    color="primary"
    size="1.2rem"
    @click="printWindow"
  />
</template>

<script lang="ts" setup>
const printWindow = function () {
  window.print();
};
</script>

<style scoped>
@page {
  margin: 0cm;
  padding: 0cm;
  size: landscape;
}

@media print {
  .hide-print {
    visibility: hidden;
  }
}

* {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
</style>
