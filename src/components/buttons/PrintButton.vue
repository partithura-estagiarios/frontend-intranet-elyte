<template>
  <q-btn
    round
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
  margin: 0 !important;
  padding: 0 !important;
  size: landscape;
}

@media print {
  @page {
    size: A4 landscape;
    margin: 0 !important;
    padding: 0 !important;
    print-color-adjust: exact;
  }

  body {
    width: 100%;
    margin: 0;
  }
}
</style>
