<script lang="ts" setup>
const form = reactive({
  newPwd: "",
  confPwd: "",
  isnewPwd: true,
  isConfPwd: true,
});

const errorMessage = ref("");
const emptyFieldPattern = /^\s*$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,8}$/;

const validatePassword = () => {
  if (emptyFieldPattern.test(form.newPwd && form.confPwd)) {
    errorMessage.value = t("notifications.fail.emptyField");
    return;
  }
  if (!passwordPattern.test(form.newPwd)) {
    errorMessage.value = t("notifications.fail.invalidPassword");
    return;
  }
  if (form.newPwd !== form.confPwd) {
    errorMessage.value = t("notifications.fail.equalPassword");
    return;
  }
  router.push("/login");
};
</script>

<template>
  <span class="titulo q-mb-lg">{{ $t("titles.Login.textPasswordForm") }}</span>
  <q-input
    rounded
    class="tamanho"
    standout="bg-info"
    bg-color="primary"
    v-model="form.newPwd"
    input-class="text-white"
    :placeholder="$t('label.newPassword')"
    :type="form.isnewPwd ? 'password' : 'text'"
  >
    <template v-slot:append>
      <q-icon
        color="white"
        class="cursor-pointer"
        @click="form.isnewPwd = !form.isnewPwd"
        :name="form.isnewPwd ? 'visibility_off' : 'visibility'"
      />
    </template>
  </q-input>
  <q-input
    rounded
    standout="bg-info"
    bg-color="primary"
    v-model="form.confPwd"
    class="tamanho q-mt-md"
    input-class="text-white"
    :placeholder="$t('label.confirmPassword')"
    :type="form.isConfPwd ? 'password' : 'text'"
  >
    <template v-slot:append>
      <q-icon
        color="white"
        class="cursor-pointer"
        @click="form.isConfPwd = !form.isConfPwd"
        :name="form.isConfPwd ? 'visibility_off' : 'visibility'"
      />
    </template>
  </q-input>
  <p class="q-mt-md text-deep-orange-14" v-if="errorMessage">
    {{ errorMessage }}
  </p>
  <q-btn
    :label="$t('action.submit.index')"
    rounded
    class="q-mt-md btn-enviar tamanho"
    size="lg"
    @click="validatePassword"
  />
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
