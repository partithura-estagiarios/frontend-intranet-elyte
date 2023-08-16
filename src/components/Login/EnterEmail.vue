<script lang="ts" setup>
import SendRecoveryEmail from "../../graphql/sendEmail/SendEmail.gql";

const data = reactive({
  emailRecover: "",
});

const sendRecoveryEmail = async () => {
  try {
    await runMutation(SendRecoveryEmail, { data });
    positiveNotify(t("notifications.success.login"));
    router.push("/emailSent");
  } catch {
    negativeNotify(t("notifications.fail.login"));
  }
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
    v-model="data.emailRecover"
    :placeholder="$t('label.inputEmail')"
  />
  <q-btn
    :label="$t('action.submit.index')"
    rounded
    class="q-mt-md btn-enviar tamanho"
    size="lg"
    @click="sendRecoveryEmail"
  />
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
