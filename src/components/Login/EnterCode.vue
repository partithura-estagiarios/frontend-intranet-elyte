<script lang="ts" setup>
const form = reactive({
  codeVerification: "",
});

const errorMessage = ref("");
const emptyFieldPattern = /^\s*$/;

const validateCode = () => {
  if (emptyFieldPattern.test(form.codeVerification)) {
    errorMessage.value = t("notifications.fail.emptyField", 2);
    return;
  }
  router.push("/changePassword");
};
</script>

<template>
  <span class="titulo q-mb-lg">{{ $t("titles.Login.enterCode") }}</span>
  <q-input
    rounded
    type="text"
    class="tamanho"
    standout="bg-info"
    bg-color="primary"
    input-class="text-white"
    v-model="form.codeVerification"
    :placeholder="$t('label.code')"
  />
  <q-btn
    :label="$t('action.submit.index')"
    rounded
    class="q-mt-md btn-enviar tamanho"
    size="lg"
    @click="validateCode"
  />
  <p class="q-mt-md" v-if="errorMessage">{{ errorMessage }}</p>
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
