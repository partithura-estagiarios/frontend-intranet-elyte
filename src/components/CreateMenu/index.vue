<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import AddMenu from "../../graphql/menu/AddMenu.gql";

const showCalendar = ref(false);
const selectedDate = ref(null);
const emits = defineEmits(["reload", "cancel"]);

const schema = yup.object({
  date: makeRuleOfString(),
  salad: makeRuleOfString(),
  rice: makeRuleOfString(),
  protein: makeRuleOfString(),
  complement: makeRuleOfString(),
  soup: makeRuleOfString(),
  dessert: makeRuleOfString(),
});

function makeRuleOfString(message: string = "warning.requiredField") {
  return yup.string().required().label(t(message));
}

const form = {
  date: "",
  salad: "",
  rice: "",
  complement: "",
  soup: "",
  protein: "",
  dessert: "",
};

async function addMenu() {
  try {
    form.date = selectedDate.value;
    await runMutation(AddMenu, { data: form });
    positiveNotify(t("notifications.success.createSystem"));
    emits("reload");
  } catch (err) {
    console.error(err);
    negativeNotify(t("notifications.fail.createSystem"));
  }
}

watch(selectedDate, () => {
  showCalendar.value = false;
});
</script>

<template>
  <div>
    <span class="text-black text-h4">{{ $t("titles.menu") }}</span>

    <div class="row justify-center q-mt-md">
      <Form
        @submit="addMenu"
        :validation-schema="schema"
        class="col-6 q-gutter-md"
      >
        <Field name="date" v-slot="item">
          <q-input
            v-model="selectedDate"
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
            v-model="form.salad"
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
            v-model="form.rice"
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
            v-model="form.protein"
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
            v-model="form.complement"
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
            v-model="form.soup"
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
            v-model="form.dessert"
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
            @click="addMenu"
          />
        </q-card-actions>
      </Form>
    </div>
  </div>
</template>
