<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "ButtonTable",
  props: {
    itens: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object as () => Object,
      default: () => {},
    },
    buttons: {
      type: Array as PropType<{ component: object }[]>,
      default: () => {},
    },
  },
});
</script>

<template :props="(item, itens)">
  <q-btn-dropdown
    class="print-hide"
    color="grey-8"
    flat
    dense
    rounded
    dropdown-icon="settings"
    no-icon-animation
  >
    <q-list v-for="(button, index) in buttons" :key="index">
      <q-item clickable>
        <component :itens="itens" :item="item" :is="button.component" />
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
