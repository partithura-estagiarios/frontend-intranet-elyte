<template>
  <div>
    <q-card class="q-mx-lg row justify-center shadow-7">
      <q-card-section class="q-my-md">
        <span class="text-uppercase row font text-bold text-black">
          {{ $t("titles.ManagementSystem") }}
          <q-icon
            color="primary"
            class="q-ml-sm"
            name="engineering"
            size="2rem"
          />
        </span>
        <q-separator size="0.5rem" color="primary" class="bar-style" />
      </q-card-section>
      <q-card-section class="row col-12 justify-around">
        <q-item
          v-for="icon in gestaoList"
          :key="icon.id"
          class="column col-4 q-my-md items-center"
          clickable
          :href="icon.link"
        >
          <q-item-section wrap>
            <q-avatar size="7rem">
              <q-icon class="border icon" :name="icon.img" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-red text-weight-bolder text-no-wrap">
              {{ $t(icon.label) }}
            </q-item-label>
            <q-item-label class="text-grey text-weight-bolder text-no-wrap">
              {{ $t(icon.subLabel) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { gestaoList } from "../lib";
</script>

<style scoped>
.border {
  border: 8px solid;
  border-radius: 50%;
  padding: 0.3rem;
  border-color: rgb(164, 164, 164);
  width: 70%;
  height: 70%;
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
.bar-style {
  border-radius: 10px;
}

.font {
  font-size: 1.6rem;
}
</style>
