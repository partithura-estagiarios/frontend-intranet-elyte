<template>
  <div class="col-4 no-padding no-margin">
    <q-card
      class="text-uppercase col q-ma-md border smaller-card mx-auto text-white"
    >
      <q-card-section class="bg-primary">
        <div>{{ menu.dayOfWeek }}</div>
      </q-card-section>
      <q-card-section class="text-subtitle2 text-black">
        <div v-if="menu">
          <div
            class="menu-item"
            v-for="property in [
              'rice',
              'salad',
              'soup',
              'complement',
              'protein',
              'dessert',
            ]"
            :key="property"
          >
            <q-icon name="restaurant" class="menu-icon" />
            <p class="menu-text">{{ menu[property] }}</p>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    menu: Object,
  },
};
</script>

<style scoped>
.border {
  border-radius: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
}

.menu-icon {
  margin-right: 8px;
}

.menu-text {
  margin-left: 8px;
}

.smaller-card {
  max-width: 290px;
  margin: 10px auto;
}
</style>
