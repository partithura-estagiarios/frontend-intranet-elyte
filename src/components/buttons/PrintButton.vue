<template>
  <q-btn
    class="row q-mt-md q-mr-md hide-print"
    color="secondary"
    :label="$t('action.print.index')"
    size="1.2rem"
    @click="printWindow"
  />
</template>

<script lang="ts" setup>
const printWindow = function () {
  window.print();
};
</script>

<style>
@page {
  margin: 0cm;
  padding: 0cm;
  size: portrait;
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
