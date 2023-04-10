<template>
  <span class="titulo q-mb-lg">{{ $t("titles.Login.textLoginForm") }}</span>
  <q-input
    rounded
    standout="bg-info"
    bg-color="primary"
    input-class="text-white"
    class="tamanho"
    v-model="data.email"
    :placeholder="$t('label.inputName')"
    color="white"
  />
  <q-input
    rounded
    standout="bg-info"
    type="password"
    bg-color="primary"
    color="red-1"
    input-class="text-white"
    label-color="white"
    class="q-pt-md tamanho"
    v-model="data.password"
    :placeholder="$t('label.inputPassword')"
  />
  <q-btn
    :label="$t('label.forgetPassword')"
    align="left"
    class="tamanho"
    no-caps
    size="1rem"
    @click="contato()"
  />
  <q-btn
    :label="$t('action.submit.index')"
    rounded
    :class="marginBtn"
    class="btn-enviar tamanho"
    size="lg"
    @click="auth()"
  />
</template>

<script lang="ts" setup>
import { AuthQuery, UserStorage } from "../../entities";
import Auth from "../../graphql/auth/index.gql";
import { userStorage } from "../../stores/index";

const marginBtn = computed(() =>
  useQuasar().screen.gt.md ? "q-mt-xl" : "q-mt-sm"
);

const data = reactive({
  email: "",
  password: "",
});

function contato() {
  infoNotify(t("titles.Login.recoverPassword"));
}

async function auth() {
  try {
    const { auth } = (await runMutation(Auth, {
      data,
    })) as unknown as AuthQuery;
    const { token, user } = auth;
    if (token) {
      const usuario: UserStorage = {
        name: user.username,
        id: user.id,
        email: user.email,
        token,
      };
      userStorage.setUser(usuario);
    }
    // setTokenStorage(token);
    positiveNotify(t("notifications.success.login"));
    router.push("/home");
  } catch ({ message }) {
    negativeNotify(t("notifications.fail.login"));
  }
}
</script>

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
