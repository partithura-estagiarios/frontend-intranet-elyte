<script lang="ts" setup>
import CreateUser from "../../graphql/registerUser/registeruser.gql";

const marginBtn = computed(() =>
  useQuasar().screen.gt.md ? "q-mt-xl" : "q-mt-sm"
);
const data = reactive({
  username: "",
  password: "",
  email: "",
});
const isPwd = ref(true);

const errorMessage = ref("");
const emptyFieldPattern = /^\s*$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,8}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const createUser = async () => {
  try {
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
    await runMutation(CreateUser, { data });
    positiveNotify(t("notifications.success.login"));
    router.push("/home");
  } catch {
    negativeNotify(t("notifications.fail.login"));
  }
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
    :type="isPwd ? 'password' : 'text'"
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
        @click="isPwd = !isPwd"
        :name="isPwd ? 'visibility_off' : 'visibility'"
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
    @click="createUser"
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
