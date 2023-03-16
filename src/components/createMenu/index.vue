<template>
  <span class="text-black text-h4">{{ $t("titles.menu") }}</span>

  <div class="row justify-center">
    <Form @submit="onSubmit" :validation-schema="schema" class="col-6">
      <Field name="day" v-slot="{ errorMessage, value, field }">
        <q-select
          :model-value="value"
          v-bind="field"
          :label="$t('text.day')"
          bg-color="grey-3"
          :options="options"
          :popup-content-style="{ color: 'black' }"
          :error-message="errorMessage"
          :error="!!errorMessage"
        />
      </Field>

      <Field name="week" v-slot="{ errorMessage, value, field }">
        <q-input
          :model-value="value"
          v-bind="field"
          :label="$t('text.week')"
          filled
          :error-message="errorMessage"
          :error="!!errorMessage"
        />
      </Field>

      <Field name="salad" v-slot="{ errorMessage, value, field }">
        <q-input
          :model-value="value"
          v-bind="field"
          :label="$t('text.menu.salad')"
          filled
          :error-message="errorMessage"
          :error="!!errorMessage"
        />
      </Field>

      <Field name="rice" v-slot="{ errorMessage, value, field }">
        <q-input
          :model-value="value"
          v-bind="field"
          :label="$t('text.menu.rice')"
          filled
          :error-message="errorMessage"
          :error="!!errorMessage"
        />
      </Field>

      <Field name="protein" v-slot="{ errorMessage, value, field }">
        <q-input
          :model-value="value"
          v-bind="field"
          :label="$t('text.menu.protein')"
          filled
          :error-message="errorMessage"
          :error="!!errorMessage"
        />
      </Field>

      <Field name="complement" v-slot="{ errorMessage, value, field }">
        <q-input
          :model-value="value"
          v-bind="field"
          :label="$t('text.menu.complement')"
          filled
          :error-message="errorMessage"
          :error="!!errorMessage"
        />
      </Field>

      <Field name="soup" v-slot="{ errorMessage, value, field }">
        <q-input
          :model-value="value"
          v-bind="field"
          :label="$t('text.menu.soup')"
          filled
          :error-message="errorMessage"
          :error="!!errorMessage"
        />
      </Field>

      <Field name="dessert" v-slot="{ errorMessage, value, field }">
        <q-input
          :model-value="value"
          v-bind="field"
          :label="$t('text.menu.dessert')"
          filled
          :error-message="errorMessage"
          :error="!!errorMessage"
        />
      </Field>
      <q-card-actions>
        <q-btn
          flat
          :label="$t('action.confirm.index')"
          color="primary"
          type="submit"
        />
      </q-card-actions>
    </Form>
  </div>
</template>

<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import CreateMenu from "../../graphql/menu/CreateMenu.gql";
import { Menu } from "../../entities";
import { Field, Form } from "vee-validate";
import * as yup from "yup";

const options = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const schema = yup.object({
  salad: yup.string().required().label("Salada"),
  rice: yup.string().required().label("Arroz"),
  complement: yup.string().required().label("Complemento"),
  soup: yup.string().required().label("Sopa"),
  protein: yup.string().required().label("Proteína"),
  dessert: yup.string().required().label("Sobremesa"),
  day: yup.string().required().label("Dia"),
  week: yup.string().required().label("Semana"),
});

async function addMenu(menu: Record<string, string | number>) {
  try {
    await runMutation(CreateMenu, { data: { ...menu } });
    const { getMenu } = await runMutation(GetMenu, {});
    menusStorage.setMenus(getMenu as unknown as [Menu]);
    positiveNotify(t("notifications.success.createMenu"));
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}

function onSubmit(values: Record<string, string | number>, actions: any) {
  loga(actions);
  loga(values);
  actions.resetForm();
  addMenu(values, actions);
}
</script>
