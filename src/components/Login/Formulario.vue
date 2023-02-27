<template>
  <h4>{{ $t("login.textLogin") }}</h4>

  <q-form>
    <div>
      <q-input
        rounded
        standout="bg-info"
        bg-color="primary"
        label-color="white"
        input-class="text-white"
        v-model="form.nomeUsuario"
        label="Nome de usuário"
      />
      <q-input
        rounded
        standout="bg-info"
        type="password"
        bg-color="primary"
        color="red-1"
        input-class="text-white"
        label-color="white"
        class="q-pt-md"
        v-model="form.senha"
        label="Senha"
      />

      <q-btn
        label="Esqueci a senha!"
        class="float-left text=capitalize"
        size="12px"
      />
    </div>

    <q-btn
      label="Entrar"
      rounded
      style="background: #fff; color: black; width: 25rem"
      class="q-mt-xl btn-enviar"
    />
  </q-form>
</template>

<script lang="ts" setup>
const form = ref({
  nomeUsuario: "",
  senha: "",
});
</script>

<style scoped>
.btn-enviar:hover {
  box-shadow: 0 8px 8px -4px red;
  color: red !important;
}
</style>
