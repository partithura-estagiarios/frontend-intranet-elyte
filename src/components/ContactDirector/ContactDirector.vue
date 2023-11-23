<template>
  <q-item class="row">
    <div class="col-5">
      <BackButton class="justify-between row q-ml-md" />
    </div>
  </q-item>
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
          :label="t('label.name.index')"
          v-bind="item.field"
          lazy-rules
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <Field name="email" v-slot="item">
        <q-input
          v-model="form.email"
          :label="t('label.email')"
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
          :label="t('label.code')"
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
          :label="t('about')"
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <div>
        <q-btn
          :label="t('action.submit.index')"
          type="submit"
          color="primary"
        />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { parse } from "path";
import SendEmail from "../../graphql/sendEmail/SendEmail.gql";
import { loginForContact } from "../../validation";
import { Field, Form } from "vee-validate";
import label from "../../../locales/br/label";
import action from "../../../locales/br/action";

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
      to: t("titles.Management.Hr"),
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
  const response = await runMutation(SendEmail, setMessage());
  if (response?.sendMail) {
    return positiveNotify(t("notifications.success.emailSentSuccessfully"));
  }
  return negativeNotify(t("notifications.fail.errorSendingToEmail"));
}
</script>
