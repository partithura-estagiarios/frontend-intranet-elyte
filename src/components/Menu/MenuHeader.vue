<script setup lang="ts">
const prop = defineProps({
  openModal: {
    type: Function,
    default: () => {},
  },
});

const emit = defineEmits(["reload"]);

function redirectToPrintRoute() {
  router.replace("/menu");
  emit("reload");
}
</script>

<template>
  <q-item>
    <q-item-section>
      <div>
        <q-btn
          round
          icon="home"
          color="primary"
          size="1.2rem"
          class="justify-start row q-ml-md"
          @click="router.back"
        />
      </div>
    </q-item-section>
    <q-item-label class="q-item-label justify-end">
      <div>
        <q-btn
          round
          icon="add"
          color="primary"
          size="1.2rem"
          @click="prop.openModal"
        />
        <q-btn
          round
          class="q-ml-xs"
          icon="visibility"
          color="primary"
          size="1.2rem"
          @click="redirectToPrintRoute"
        />
      </div>
    </q-item-label>
  </q-item>
</template>
