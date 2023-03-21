<template>
  <div class="side">
    <q-card class="q-mx-lg row justify-center shadow-7">
      <q-card-section class="q-my-md">
        <span class="text-black text-uppercase row font text-bold">
          {{ $t("titles.HrSystem") }}
          <q-icon
            color="primary"
            class="q-ml-sm"
            size="2rem"
            name="supervisor_account"
          />
        </span>
        <q-separator size="0.5rem" color="primary" />
        <q-badge color="primary">Em desenvolvimento</q-badge>
      </q-card-section>
      <q-card-section class="row">
        <q-item
          v-for="icon in rhList"
          :key="icon.id"
          class="col-3 column q-my-md items-center"
          clickable
        >
          <q-item-section avatar>
            <q-avatar class="row" size="7rem">
              <q-icon class="border icon" :name="icon.img" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="row">
            <q-item-label class="text-red text-weight-bolder">
              {{ $t(icon.label) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { rhList } from "../lib";
</script>

<style scoped>
.border {
  border: 8px solid;
  border-radius: 50%;
  padding: 0.3rem;
  border-color: rgb(164, 164, 164);
  width: 4.5rem;
  height: 4.5rem;
}

.icon {
  color: grey;
}

.icon:hover {
  color: rgb(229, 57, 53);
}

.border:hover {
  border-color: rgb(229, 57, 53);
}

.font {
  font-size: 1.6rem;
}
</style>
