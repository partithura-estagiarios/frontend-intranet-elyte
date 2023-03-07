<template>
  <span class="titulo q-mb-lg">{{ $t("titles.Login.textLoginForm") }}</span>

  <q-form>
    <div>
      <q-input
        rounded
        standout="bg-info"
        bg-color="primary"
        input-class="text-white"
        class="tamanho"
        v-model="dados.email"
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
        v-model="dados.password"
        :placeholder="$t('label.inputPassword')"
      />

      <q-btn
        :label="$t('label.forgetPassword')"
        class="float-left"
        no-caps
        size="1rem"
        to="login/esqueciSenha"
      />
    </div>

    <q-btn
      :label="$t('action.submit.index')"
      rounded
      :class="marginBtn"
      class="btn-enviar tamanho"
      size="lg"
      @click="auth()"
    />
  </q-form>
</template>

<script lang="ts" setup>
import { AuthQuery } from "../../entities";
import Auth from "../../graphql/auth/index.gql";

import { useQuasar } from "quasar";

const $q = useQuasar();

const marginBtn = computed(() => ($q.screen.gt.md ? "q-mt-xl" : "q-mt-sm"));

const dados = reactive({
  email: "",
  password: "",
});

async function auth() {
  try {
    const { auth } = (await runMutation(Auth, {
      data: { ...dados },
    })) as unknown as AuthQuery;
    const token = auth.token;
    const user = auth.user;
    if (token) {
      userStorage.setUser({
        username: user.username,
        id: user.id,
        email: user.email,
        token,
      });
    }
    setTokenStorage(token);
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
