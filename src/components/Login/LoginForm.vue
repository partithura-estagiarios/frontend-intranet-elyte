<script lang="ts" setup>
import { AuthQuery } from "../../entities";
import Auth from "../../graphql/auth/login.gql";
const marginBtn = computed(() =>
  useQuasar().screen.gt.md ? "q-mt-xl" : "q-mt-sm"
);
const data = reactive({
  username: "",
  password: "",
});
async function auth() {
  try {
    const { auth } = (await runMutation(Auth, data)) as unknown as AuthQuery;
    const { token, user } = auth;
    if (token) {
      userStorage.setUser({
        username: user.username,
        id: user.id,
        email: user.email,
      });
      userStorage.setToken(user.id);
      positiveNotify(t("notifications.success.login"));
      router.push("/admin");
    }
  } catch (err) {
    negativeNotify(t("notifications.fail.login"));
  }
}
</script>

<template>
  <span class="titulo q-mb-lg">{{ $t("titles.Login.textLoginForm") }}</span>
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
    type="password"
    bg-color="primary"
    input-class="text-white"
    class="q-pt-md size"
    v-model="data.password"
    :placeholder="$t('label.inputPassword')"
  />
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
