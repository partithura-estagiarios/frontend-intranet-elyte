<script setup lang="ts">
const emit = defineEmits(["some-icon"]);
const options = [
  ["search", "home", "copyright"],
  ["https", "restore", "source"],
  ["https", "restore", "source"],
  ["https", "restore", "source"],
  ["https", "restore", "source"],
  ["https", "restore", "source"],
  ["https", "restore", "source"],
  ["search", "home", "copyright"],
  ["https", "restore", "source"],
  ["https", "restore", "source"],
  ["https", "restore", "source"],
  ["https", "restore", "source"],
];
const showListOfIcons = ref(false);
const labelIcons = ref("pageview");
function handleMouseOver() {
  showListOfIcons.value = true;
  labelIcons.value = "";
}

function handleMouseLeave() {
  showListOfIcons.value = false;
  labelIcons.value = "pageview";
}
function getIcon(icon: string) {
  emit("some-icon", icon);
}
</script>

<template>
  <q-btn
    v-if="labelIcons"
    class="btn"
    unelevated
    :icon="labelIcons"
    @mouseover="handleMouseOver"
  />
  <q-card
    class="card q-pt-none"
    v-if="showListOfIcons"
    @click="handleMouseLeave"
    @mouseleave="handleMouseLeave"
  >
    <ScrollBar :icons="options" @some-icon="(icon) => getIcon(icon)" />
  </q-card>
</template>
<style scoped>
.card {
  padding: 0%;
  z-index: 1000;
  width: 180px;
  height: 200px;
  top: 80px;
}
</style>
