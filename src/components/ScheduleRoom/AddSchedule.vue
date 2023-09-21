<script setup lang="ts">
import { Form, Field } from "vee-validate";

const form = reactive({
  userCreated: "",
  roomId: "",
  description: "",
  initialTime: null as unknown as string,
  finalTime: null as unknown as string,
  support: {
    computer: false,
    projector: false,
    coffee: false,
    water: false,
  },
});
</script>

<template></template>

<style>
.q-menu:has(> div.date-menu) {
  max-width: 10% !important;
}

.schedule-item-border {
  border: 1px solid #ff0321;
  border-radius: 5px;
}
</style>
