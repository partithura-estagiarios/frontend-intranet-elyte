<template>
  <div class="div q-pa-none" rounded-borders>
    <q-scroll-area class="scroll">
      <div
        class="color-red-6"
        v-for="(option, index) in props.icons"
        :key="index"
      >
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
    </q-scroll-area>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(["some-icon"]);
const props = defineProps({
  icons: {
    type: Array,
    required: true,
  },
});
function getIcon(icon: String) {
  emits("some-icon", icon);
}
</script>
<style scoped>
.scroll {
  height: 200px;
  max-width: 180px;
}
.div {
  max-width: 180px;
}
</style>
