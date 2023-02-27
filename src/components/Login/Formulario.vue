<template>
  <span class="titulo q-mb-xl">{{ $t("login.textLogin") }}</span>

  <q-form>
    <div>
      <q-input
        rounded
        standout="bg-info"
        bg-color="primary"
        label-color="white"
        input-class="text-white"
        v-model="form.nomeUsuario"
        :label="$t('login.labelInputName')"
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
        :label="$t('login.labelInputPassword')"
      />

      <q-btn
        :label="$t('login.labelForgetPassword')"
        class="float-left"
        no-caps
        size="1rem"
      />
    </div>

    <q-btn
      :label="$t('login.submitButton')"
      rounded
      style="background: #fff; color: black; width: 25rem"
      class="q-mt-xl btn-enviar"
      size="lg"
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

.titulo {
  font-size: 1.5rem;
}
</style>
