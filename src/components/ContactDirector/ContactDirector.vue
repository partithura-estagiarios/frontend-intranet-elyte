<template>
  <div class="col-5">
    <BackButton class="justify-start row q-ml-md" />
  </div>
  <div class="q-pa-md">
    <div class="justify-start">
      <span class="text-black font text-bold q-ml-xl">
        {{ $t("titles.Login.contactTheDirector") }}
        <q-separator size="0.2rem" color="primary" class="bar-style" />
      </span>
    </div>
    <Form class="q-gutter-md" ::validation-schema="loginForContac">
      <Field name="email" v-slot="item">
        <q-input
          :model-value="item.value"
          label="Seu Email*"
          v-bind="item.field"
          lazy-rules
        />
      </Field>
      <Field name="registration" v-slot="item">
        <q-input
          type="number"
          :model-value="item.value"
          v-bind="item.field"
          label="Sua Matrícula *"
          lazy-rules
        />
      </Field>
      <Field name="contact" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          type="textarea"
          label="Seu Contato *"
        />
      </Field>
      <Button class="bg-transparent">
        <q-btn label="Enviar" type="submit" color="primary" />
      </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { email } from "@vee-validate/rules";
import { loginForContac } from "../../validation";
import { Field, Form } from "vee-validate";
</script>
<style scoped>
.q-pa-md {
  max-width: 400px;
  margin: 0 auto;
}
span {
  margin: 0;
  font-size: 24px;
}
</style>
