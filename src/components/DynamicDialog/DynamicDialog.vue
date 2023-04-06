<template>
  <q-dialog v-model="modal" persistent>
    <MainCard class="background-dark" v-bind="$props">
      <slot />
    </MainCard>
  </q-dialog>
</template>

<script setup lang="ts">
const modal = ref(false);

watchEffect(() => {
  modal.value = props.open;
});

const props = defineProps({
  open: Boolean,
  title: String,
});
</script>
