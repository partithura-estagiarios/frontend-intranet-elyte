<template>
  <span class="text-black text-h4">{{ $t("titles.menu") }}</span>

  <div class="row justify-center q-mt-md">
    <Form
      @submit="addMenu"
      :validation-schema="schema"
      class="col-6 q-gutter-md"
    >
      <Field name="date" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          filled
          type="date"
          autofocus
          format="DD/MM/YYYY"
          formatModel="string"
        />
        <span v-if="item.errorMessage" class="text-red q-mb-xl">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <Field name="salad" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          :label="$t('text.menu.salad')"
          filled
        />
        <span v-if="item.errorMessage" class="text-red q-mb-xl">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <Field name="rice" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          :label="$t('text.menu.rice')"
          filled
        />
        <span v-if="item.errorMessage" class="text-red q-mb-xl">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <Field name="protein" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          :label="$t('text.menu.protein')"
          filled
        />
        <span v-if="item.errorMessage" class="text-red q-mb-xl">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <Field name="complement" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          :label="$t('text.menu.complement')"
          filled
        />
        <span v-if="item.errorMessage" class="text-red q-mb-xl">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <Field name="soup" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          :label="$t('text.menu.soup')"
          filled
        />
        <span v-if="item.errorMessage" class="text-red q-mb-xl">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <Field name="dessert" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          :label="$t('text.menu.dessert')"
          filled
        />
        <span v-if="item.errorMessage" class="text-red q-mb-xl">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
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

const schema = yup.object({
  salad: makeRuleOfString(),
  rice: makeRuleOfString(),
  complement: makeRuleOfString(),
  soup: makeRuleOfString(),
  protein: makeRuleOfString(),
  dessert: makeRuleOfString(),
  date: makeRuleOfString(),
});

function makeRuleOfString(message: string = "warning.requiredField") {
  return yup.string().required().label(t(message));
}

async function addMenu(menu: Record<string, string | number>, actions: any) {
  try {
    const notRepeatDate = await runMutation(CreateMenu, { data: { ...menu } });
    if (notRepeatDate == null) {
      throw new Error("Data já existe");
    }
    const { getMenu } = await runMutation(GetMenu, {});
    menusStorage.setMenus(getMenu as unknown as [Menu]);
    positiveNotify(t("notifications.success.createMenu"));
    actions.resetForm();
  } catch (e) {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}
</script>
