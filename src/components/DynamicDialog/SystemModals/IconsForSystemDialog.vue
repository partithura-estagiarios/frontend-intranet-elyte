<script setup lang="ts">
const emit = defineEmits(["some-icon"]);
const options = [
  ["search", "home", "copyright"],
  ["https", "restore", "source"],
];
const showListOfIcons = ref(false);
const labelIcons = ref("Icones");
function handleMouseOver() {
  showListOfIcons.value = true;
  labelIcons.value = "";
}

function handleMouseLeave() {
  showListOfIcons.value = false;
  labelIcons.value = "Ícones";
}
function getIcon(icon: string) {
  emit("some-icon", icon);
}
</script>

<template>
  <q-btn
    class="btn"
    :label="labelIcons"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <q-card-section v-if="showListOfIcons" @click="showListOfIcons = false">
      <div class="color-red-6" v-for="(option, index) in options" :key="index">
        <q-icon
          class="cursor-pointer q-pa-sm"
          v-for="icon in option"
          :key="icon"
          size="2.3rem"
          :name="icon"
          @click="getIcon(icon)"
          clickable
        />
      </div>
    </q-card-section>
  </q-btn>
</template>
<style scoped>
.btn {
  background: white;
  padding: 0%;
}
</style>
