<script lang="ts" setup>
const marginBtn = computed(() =>
  useQuasar().screen.gt.md ? "q-mt-xl" : "q-mt-sm"
);
const data = reactive({
  username: "",
  password: "",
  email: "",
  isPwd: true,
});

const errorMessage = ref("");
const emptyFieldPattern = /^\s*$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,8}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const validatePassword = () => {
  if (emptyFieldPattern.test(data.username && data.password && data.email)) {
    errorMessage.value = t("notifications.fail.emptyField");
    return;
  }
  if (!emailPattern.test(data.email)) {
    errorMessage.value = t("notifications.fail.invalidEmail");
    return;
  }
  if (!passwordPattern.test(data.password)) {
    errorMessage.value = t("notifications.fail.invalidPassword");
    return;
  }
  router.push("/home");
};
</script>

<template>
  <span class="q-mb-lg">{{ $t("titles.Login.textLoginForm") }}</span>
  <q-input
    rounded
    standout="bg-info"
    bg-color="primary"
    input-class="text-white"
    class="size text-white"
    v-model="data.username"
    :placeholder="$t('label.inputName')"
  />
  <q-input
    rounded
    standout="bg-info"
    :type="data.isPwd ? 'password' : 'text'"
    bg-color="primary"
    input-class="text-white"
    class="q-pt-md size"
    v-model="data.password"
    :placeholder="$t('label.inputPassword')"
  >
    <template v-slot:append>
      <q-icon
        color="white"
        class="cursor-pointer"
        @click="data.isPwd = !data.isPwd"
        :name="data.isPwd ? 'visibility_off' : 'visibility'"
      />
    </template>
  </q-input>
  <q-input
    rounded
    standout="bg-info"
    type="email"
    bg-color="primary"
    input-class="text-white"
    class="q-pt-md size"
    v-model="data.email"
    :placeholder="$t('label.inputEmail')"
  />
  <p class="q-mt-md text-deep-orange-14" v-if="errorMessage">
    {{ errorMessage }}
  </p>
  <q-btn
    :label="$t('action.register.index')"
    rounded
    :class="marginBtn"
    class="btn-enviar size text-black bg-white"
    size="lg"
    @click="validatePassword"
  />
</template>

<style scoped>
.btn-enviar {
  box-shadow: 0px 10px 40px -12px #fff;
}
.btn-enviar:hover {
  box-shadow: 0px 10px 40px -12px #ff0000;
}
.size {
  width: 20rem;
}
</style>
