<template>
  <span class="titulo q-mb-lg">{{ $t("action.login.index") }}</span>

  <q-form>
    <div>
      <q-input
        rounded
        standout="bg-info"
        bg-color="primary"
        input-class="text-white"
        v-model="dados.email"
        :placeholder="$t('login.labelInputName')"
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
        class="q-pt-md"
        v-model="dados.password"
        :placeholder="$t('login.labelInputPassword')"
      />

      <q-btn
        :label="$t('action.login.labelForgetPassword')"
        class="float-left"
        no-caps
        size="1rem"
        to="login/esqueciSenha"
      />
    </div>

    <q-btn
      :label="$t('action.submit.index')"
      rounded
      style="background: #fff; color: black; width: 20rem"
      :class="marginBtn"
      class="btn-enviar"
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

const marginBtn = computed(() => {
  if ($q.screen.gt.md) {
    return "q-mt-xl";
  }
  return "q-mt-sm";
});

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
}
.btn-enviar:hover {
  box-shadow: 0px 10px 40px -12px #ff0000;
}
</style>
