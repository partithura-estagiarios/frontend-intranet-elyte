<script lang="ts" setup>
const form = reactive({
  emailRecover: "",
});
</script>
<template>
  <span class="titulo q-mb-lg">{{ $t("titles.Login.enterCode") }}</span>
  <q-input
    rounded
    standout="bg-info"
    bg-color="primary"
    input-class="text-white"
    v-model="form.emailRecover"
    :placeholder="$t('label.code')"
    type="text"
    class="tamanho"
  />
  <q-btn
    :label="$t('action.submit.index')"
    rounded
    class="q-mt-md btn-enviar tamanho"
    size="lg"
    to="/changePassword"
  />

  <q-btn
    class="q-mt-md"
    icon="chevron_left"
    size="16px"
    text-color="primary"
    to="/enterEmail"
  >
    <span class="text-white">
      {{ $t("action.back.index") }}
    </span>
  </q-btn>
</template>

<style scoped>
.btn-enviar {
  box-shadow: 0px 10px 40px -12px #fff;
  background: #fff;
  color: black;
}
.btn-enviar:hover {
  box-shadow: 0px 10px 40px -12px #ff0000;
}
.tamanho {
  width: 20rem;
}
</style>
