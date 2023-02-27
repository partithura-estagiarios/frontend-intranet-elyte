<template>
  <q-template>
    <q-img
      class="background-image"
      src="../../assets/loginImages/fundoLogin.png"
      style="height: 100%; max-width: 100%"
    >
      <div class="full-width column items-center bg-transparent q-mt-xl">
        <q-img src="../../assets/loginImages/logoElyte.png" width="10rem" />
        <span class="text-weight-bold q-mb-xl q-mt-sm titulo"
          >Intranet Elyte</span
        >
        <Formulario />
      </div>
    </q-img>
  </q-template>
</template>

<script lang="ts" setup></script>

<style scoped>
.titulo {
  font-size: 2rem;
}
</style>
