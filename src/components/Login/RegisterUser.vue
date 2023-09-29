<script lang="ts" setup>
import CreateUser from "../../graphql/registerUser/registeruser.gql";
import { Field, Form } from "vee-validate";
import { validationSchema } from "../../validation";
import { UserForm } from "../../entities/User";

const marginBtn = computed(() =>
  useQuasar().screen.gt.md ? "q-mt-xl" : "q-mt-sm"
);

const isPwdvisible = ref(true);
const createUser = async (data: UserForm) => {
  try {
    await runMutation(CreateUser, { data });
    positiveNotify(t("notifications.success.login"));
    router.push("/home");
  } catch {
    negativeNotify(t("notifications.fail.login"));
  }
};
</script>

<template>
  <span class="q-mb-lg">{{ $t("titles.Login.textLoginForm") }}</span>
  <Form
    @submit="createUser"
    :validation-schema="validationSchema"
    class="q-gutter-md"
  >
    <Field name="username" v-slot="item">
      <q-input
        :model-value="item.value"
        v-bind="item.field"
        rounded
        standout="bg-info"
        bg-color="primary"
        input-class="text-white"
        class="size text-white"
        :placeholder="$t('label.inputName')"
      />
      <span v-if="item.errorMessage" class="text-red">
        {{ parseErrorMessage(item.errorMessage) }}
      </span>
    </Field>

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

    <Field name="password" v-slot="item">
      <div>
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          rounded
          standout="bg-info"
          bg-color="primary"
          input-class="text-white"
          class="size text-white"
          :placeholder="$t('label.inputPassword')"
          :type="isPwdvisible ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              color="white"
              class="cursor-pointer"
              @click="isPwdvisible = !isPwdvisible"
              :name="isPwdvisible ? 'visibility_off' : 'visibility'"
            />
          </template>
        </q-input>
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </div>
    </Field>
    <Button class="bg-transparent no-padding">
      <q-btn
        :label="$t('action.register.index')"
        rounded
        :class="marginBtn"
        class="btn-enviar size text-black bg-white"
        size="lg"
      />
    </Button>
  </Form>
</template>

<style scoped>
.btn-enviar {
  box-shadow: 0px 10px 40px -12px #fff;
}
.btn-enviar:hover {
  box-shadow: 0px 10px 40px -12px #ff0000;
}
.size {
  width: 20rem;
}
</style>
