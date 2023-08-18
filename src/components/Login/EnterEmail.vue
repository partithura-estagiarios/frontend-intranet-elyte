<script lang="ts" setup>
import SendRecoveryEmail from "../../graphql/sendEmail/SendEmail.gql";
import { Field, Form } from "vee-validate";
import { validationSchema } from "../../validation";
import { UserForm } from "../../entities/User";

const sendRecoveryEmail = async (data: UserForm) => {
  console.log("data");
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
  <Form
    @submit="sendRecoveryEmail"
    :validation-schema="validationSchema"
    class="q-gutter-md"
  >
    <Field name="email" v-slot="item">
      <q-input
        :model-value="item.value"
        v-bind="item.field"
        rounded
        standout="bg-info"
        bg-color="primary"
        input-class="text-white"
        class="size text-white"
        :placeholder="$t('label.inputEmail')"
      />
      <span v-if="item.errorMessage" class="text-red">
        {{ parseErrorMessage(item.errorMessage) }}
      </span>
    </Field>
    <button>Submit</button>
    <!-- <Button class="bg-transparent no-padding">
        <q-btn
          :label="$t('action.submit.index')"
          rounded
          class="btn-enviar size text-black bg-white"
          size="lg"
        />
      </Button>
      <Button class="bg-transparent no-padding">
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
      </Button> -->
  </Form>
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
.size {
  width: 20rem;
}
</style>
