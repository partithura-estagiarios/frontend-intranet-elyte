<script setup lang="ts">
import GetMenu from "../../graphql/menu/GetMenu.gql";
import CreateMenu from "../../graphql/menu/CreateMenu.gql";
import { Menu } from "../../entities";
import { Field, Form } from "vee-validate";
import * as yup from "yup";

const showCalendar = ref(false);
const selectedDate = ref(null);

const schema = yup.object({
  salad: yup.string().required().label(t("warning.requiredField")),
  rice: yup.string().required().label(t("warning.requiredField")),
  complement: yup.string().required().label(t("warning.requiredField")),
  soup: yup.string().required().label(t("warning.requiredField")),
  protein: yup.string().required().label(t("warning.requiredField")),
  dessert: yup.string().required().label(t("warning.requiredField")),
  day: yup.string().required().label(t("warning.requiredField")),
  week: yup.string().required().label(t("warning.requiredField")),
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

watch(selectedDate, () => {
  showCalendar.value = false;
});
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
        <q-input
          v-model="selectedDate"
          v-bind="item.field"
          :label="$t('text.day')"
          filled
          @click="showCalendar = true"
        />

        <q-date
          v-model="selectedDate"
          v-if="showCalendar"
          :label="$t('text.day')"
          bg-color="grey-3"
          class="text-black"
          :popup-content-style="{ color: 'black' }"
          @input="showCalendar = false"
        >
        </q-date>

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
