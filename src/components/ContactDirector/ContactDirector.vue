<template>
  <BackButton class="justify-between row q-ml-md" />
  <div class="text-h4 col-6 row justify-center q-mr-md">
    <span class="text-black font text-bold">
      {{ $t("titles.Login.contactTheDirector") }}
      <q-separator size="0.5rem" color="primary" class="bar-style" />
    </span>
  </div>
  <div class="q-pa-xl">
    <Form class="q-gutter-md" :validation-schema="loginForContac">
      <Field name="email" v-slot="item">
        <q-input
          :model-value="item.value"
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
          :model-value="item.value"
          v-bind="item.field"
          label="Sua Matrícula *"
          lazy-rules
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <Field name="contact" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          type="textarea"
          label="Seu Contato *"
        />
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>
      <div>
        <button class="bg-transparent">
          <q-btn label="Enviar" type="submit" color="primary" />
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { email } from "@vee-validate/rules";
import { loginForContac } from "../../validation";
import { Field, Form } from "vee-validate";
</script>
