<script lang="ts" setup>
const form = reactive({
  emailRecover: "",
});

const errorMessage = ref("");
const emptyFieldPattern = /^\s*$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const validateEmail = () => {
  if (emptyFieldPattern.test(form.emailRecover)) {
    errorMessage.value = t("notifications.fail.emptyField", 2);
    return;
  }
  if (!emailPattern.test(form.emailRecover)) {
    errorMessage.value = t("notifications.fail.invalidEmail");
    return;
  }
  router.push("/emailSent");
};
</script>

<template>
  <span class="titulo q-mb-lg">{{ $t("titles.Login.textPasswordForm") }}</span>
  <q-input
    rounded
    type="email"
    class="tamanho"
    standout="bg-info"
    bg-color="primary"
    input-class="text-white"
    v-model="form.emailRecover"
    :placeholder="$t('label.inputEmail')"
  />
  <q-btn
    :label="$t('action.submit.index')"
    rounded
    class="q-mt-md btn-enviar tamanho"
    size="lg"
    @click="validateEmail"
  />
  <p class="q-mt-md" v-if="errorMessage">{{ errorMessage }}</p>
  <q-btn
    class="q-mt-md"
    icon="chevron_left"
    size="16px"
    text-color="primary"
    to="/login"
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
