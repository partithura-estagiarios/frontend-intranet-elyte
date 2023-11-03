<script setup lang="ts">
const emit = defineEmits(["some-icon"]);
const options = [
  ["search", "home", "copyright"],
  ["https", "restore", "source"],
];
function getIcon(icon: string) {
  emit("some-icon", icon);
}
const dialog = ref(false);
</script>

<template>
  <q-btn round color="primary" icon="pageview" @click="dialog = true">
    <q-dialog v-model="dialog" :position="'right'">
      <q-card-section
        class="row items-center q-gutter-sm bg-primary color-white"
      >
        <div
          v-for="(option, index) in options"
          :key="index"
          clickable
          v-close-popup
        >
          <q-icon
            class="cursor-pointer q-pa-sm"
            v-for="icon in option"
            :key="icon"
            size="2.3rem"
            :name="icon"
            @click="getIcon(icon)"
          />
        </div>
      </q-card-section>
    </q-dialog>
  </q-btn>
</template>
