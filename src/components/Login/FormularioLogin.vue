<template>
  <span class="titulo q-mb-lg">{{ $t("login.textLogin") }}</span>

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
        :label="$t('login.labelForgetPassword')"
        class="float-left"
        no-caps
        size="1rem"
        to="login/esqueciSenha"
      />
    </div>

    <q-btn
      :label="$t('login.submitButton')"
      rounded
      style="background: #fff; color: black; width: 20rem"
      class="q-mt-xl btn-enviar"
      size="lg"
      @click="auth()"
    />
  </q-form>
</template>

<script lang="ts" setup>
import Auth from "../../graphql/auth/index.gql";

const dados = reactive({
  email: "",
  password: "",
});

async function auth() {
  try {
    const { auth } = await runMutation(Auth, { data: { ...dados } });
    router.push("/home");
    positiveNotify(t("login.correctLogin"));
    console.log(auth);
  } catch ({ message }) {
    negativeNotify(t("login.incorrectLogin"));
  }
}
</script>

<style scoped>
.btn-enviar:hover {
  box-shadow: 0 8px 8px -4px red;
  color: red !important;
}
</style>
