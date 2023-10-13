<template>
  <BackButton class="justify-between row q-ml-md" />
  <div class="text-h4 col-6 row justify-center q-mr-md">
    <span class="text-black font text-bold">
      {{ $t("titles.Login.contactTheDirector") }}
      <br />
      <q-separator size="0.5rem" color="primary" class="bar-style" />
    </span>
  </div>
  <div class="q-pa-xl">
    <Form
      @submit="saveForm"
      class="q-gutter-md"
      :validation-schema="loginForContact"
    >
      <Field name="username" v-slot="item">
        <q-input
          v-model="form.fullname"
          label="Seu Nome Completo*"
          v-bind="item.field"
          lazy-rules
        />
      </Field>
      <Field name="email" v-slot="item">
        <q-input
          v-model="form.email"
          label="Seu Email*"
          v-bind="item.field"
          lazy-rules
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <Field name="registration" v-slot="item">
        <q-input
          type="number"
          v-model="form.registration"
          v-bind="item.field"
          label="Sua Matrícula *"
          lazy-rules
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <Field name="message" v-slot="item">
        <q-input
          v-model="form.message"
          v-bind="item.field"
          type="textarea"
          label="Seu Contato *"
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <div>
        <q-btn
          label="Enviar"
          type="submit"
          color="primary"
          :loading="isLoading"
        />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
const $q = useQuasar();
const isLoading = ref(false);

const form = reactive(buildForm());

function buildForm() {
  return {
    fullname: null,
    registration: null,
    email: null,
    message: null,
  };
}

function setMessage() {
  const name = form.fullname || t("email.form.anonymousContact");
  const from = form.email || "anonimo@anonimo.com";

  return {
    type: "contact",
    data: {
      to: "hr",
      subject: t("email.form.subjectContactTheDirector"),
      name,
      from,
      text: constructBodyEmail(name, from),
    },
  };
}

function constructBodyEmail(name: string, email: string) {
  return t("email.form.fromBody", {
    name: name,
    contact: `e-mail: ${email}`,
    message: form.message,
  });
}

async function saveForm() {
  if (!form.message) {
    $q.notify({
      color: "negative",
      message: "Email contém erros",
    });
    return;
  }
  isLoading.value = true;
  const response = await runMutation(SendEmail, setMessage());
  isLoading.value = false;

  if (response?.sendMail) {
    $q.notify({
      color: "positive",
      message: "Email enviado com sucesso",
    });
    return;
  }
  $q.notify({
    color: "negative",
    message: "Email contém erros",
  });
}

import { SendEmail } from "../../graphql/sendEmail/SendEmail.gql";
import { loginForContact } from "../../validation";
import { Field, Form } from "vee-validate";
</script>
