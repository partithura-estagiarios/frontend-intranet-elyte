<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import CreateMenu from "../../graphql/menu/CreateMenu.gql";
import { Menu } from "../../entities";
import { Field, Form } from "vee-validate";
import * as yup from "yup";

const options = [
  t("text.days.sunday"),
  t("text.days.monday"),
  t("text.days.tuesday"),
  t("text.days.wednesday"),
  t("text.days.thursday"),
  t("text.days.friday"),
  t("text.days.saturday"),
];

function makeRuleOfString(message: string = "warning.requiredField") {
  return yup.string().required().label(t(message));
}

const schema = yup.object({
  salad: makeRuleOfString(),
  rice: makeRuleOfString(),
  complement: makeRuleOfString(),
  soup: makeRuleOfString(),
  protein: makeRuleOfString(),
  dessert: makeRuleOfString(),
  day: makeRuleOfString(),
  week: makeRuleOfString(),
});

async function addMenu(menu: Record<string, string | number>, actions: any) {
  try {
    await runMutation(CreateMenu, { data: { ...menu } });
    const { getMenu } = await runMutation(GetMenu, {});
    menusStorage.setMenus(getMenu as unknown as [Menu]);
    positiveNotify(t("notifications.success.createMenu"));
    actions.resetForm();
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}
</script>

<template>
  <span class="text-black text-h4">{{ $t("titles.menu") }}</span>

  <div class="row justify-center q-mt-md">
    <Form
      @submit="addMenu"
      :validation-schema="schema"
      class="col-6 q-gutter-md"
    >
      <Field name="day" v-slot="item">
        <q-select
          :model-value="item.value"
          v-bind="item.field"
          :label="$t('text.day')"
          bg-color="grey-3"
          :options="options"
          :popup-content-style="{ color: 'black' }"
        />
        <span v-if="item.errorMessage" class="text-red q-mb-xl">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </Field>

      <Field name="week" v-slot="item">
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          :label="$t('text.week')"
          filled
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
