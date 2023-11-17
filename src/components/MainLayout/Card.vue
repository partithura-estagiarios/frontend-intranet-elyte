<template>
  <q-card-section class="row col-12 justify-around">
    <q-item
      v-for="icon in iconsForSystem"
      :key="icon.id"
      class="column col-4 q-my-md items-center"
      clickable
      :to="icon.link"
    >
      <q-item-section wrap>
        <q-avatar size="7rem">
          <q-icon
            class="border icon border-radius-inherit q-pa-md"
            size="4rem"
            :name="icon.icon"
          />
        </q-avatar>
      </q-item-section>

      <q-item-section class="q-mt-md">
        <q-item-label
          class="text-grey-8 text-h6 text-weight-bolder text-no-wrap"
        >
          {{ $t(icon.label) }}
        </q-item-label>
        <q-item-label class="text-grey text-weight-bolder text-no-wrap">
          {{ $t(icon.sublabel) }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card-section>
</template>
<script setup lang="ts">
import { System } from "../../entities";

const props = defineProps({
  iconsForSystem: {
    type: Array<System>,
    default: [],
  },
});
</script>
<style scoped>
.border {
  border: 8px solid;
  border-color: rgb(164, 164, 164, 0.4);
}
.icon {
  color: rgb(164, 164, 164, 0.4);
}
.icon:hover {
  color: var(--q-primary);
}
.border:hover {
  border-color: var(--q-primary);
}
</style>
