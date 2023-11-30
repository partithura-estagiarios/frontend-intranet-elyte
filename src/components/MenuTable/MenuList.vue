<template>
  <div class="row justify-center no-print">
    <div class="col">
      <div v-if="menus.length === 0" class="text-center relative text-h5">
        <span>{{ $t("warning.noRegistrationMenu") }}</span>
      </div>
      <div v-else class="row">
        <div class="col">
          <div class="row">
            <menu-card
              v-for="(menu, index) in menus"
              :key="index"
              :menu="menu"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MenuCard from "./MenuCard.vue";

export default {
  components: {
    MenuCard,
  },
  props: {
    menus: Array,
  },
};
</script>
