<script lang="ts" setup>
import { AuthQuery } from "../../entities";
import Auth from "../../graphql/auth/login.gql";

const marginBtn = computed(() =>
  useQuasar().screen.gt.md ? "q-mt-xl" : "q-mt-sm"
);

const data = reactive({
  username: "",
  password: "",
  isPwd: true,
});

const errorMessage = ref("");
const emptyFieldPattern = /^\s*$/;

async function auth() {
  if (emptyFieldPattern.test(data.username && data.password)) {
    errorMessage.value = t("notifications.fail.emptyField", 1);
  }
  try {
    const { auth } = (await runMutation(Auth, data)) as unknown as AuthQuery;
    const { token, user } = auth;
    if (token) {
      userStorage.setUser({
        username: user.username,
        id: user.id,
        email: user.email,
      });
      userStorage.setToken(token);
      positiveNotify(t("notifications.success.login"));
      router.push("/");
    }
  } catch {
    negativeNotify(t("notifications.fail.login"));
  }
}
</script>

<template>
  <span class="q-mb-lg">{{ $t("titles.Login.textLoginForm") }}</span>
  <q-input
    rounded
    standout="bg-info"
    bg-color="primary"
    class="size text-white"
    v-model="data.username"
    input-class="text-white"
    :placeholder="$t('label.inputName')"
  />
  <q-input
    rounded
    standout="bg-info"
    bg-color="primary"
    class="q-pt-md size"
    v-model="data.password"
    input-class="text-white"
    :type="data.isPwd ? 'password' : 'text'"
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

  <q-item class="size" to="/recover">
    <q-item-section align="left">
      {{ $t("label.forgetPassword") }}
    </q-item-section>
  </q-item>

  <p class="q-mt-md text-deep-orange-14" v-if="errorMessage">
    {{ errorMessage }}
  </p>
  <q-btn
    :label="$t('action.submit.index')"
    rounded
    :class="marginBtn"
    class="btn-enviar size text-black bg-white"
    size="lg"
    @click="() => auth()"
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
