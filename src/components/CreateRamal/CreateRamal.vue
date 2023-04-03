<template>
  <DynamicDialog
    v-bind="$props"
    class="text-black text"
    :title="$t('action.addRamal.index')"
  >
    <RamalForm v-bind="$attrs" />
  </DynamicDialog>
</template>

<style scoped>
.text {
  text-transform: capitalize;
}
</style>
