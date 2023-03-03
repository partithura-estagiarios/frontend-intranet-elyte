<template>
  <q-img
    class="background-image"
    src="../../assets/loginImages/fundoLogin.png"
    style="height: 100%; max-width: 100%"
    no-transition
    no-spinner
  >
    <div class="full-width column items-center bg-transparent q-mt-xl">
      <q-img
        src="../../assets/loginImages/logoElyte.png"
        width="10rem"
        no-transition
        no-spinner
      />
      <span class="text-weight-bold q-mb-xl q-mt-sm titulo"
        >Intranet Elyte</span
      >
      <slot></slot>
    </div>
  </q-img>
</template>

<style>
.titulo {
  font-size: 1.5rem;
}
</style>
