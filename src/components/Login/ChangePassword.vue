<script lang="ts" setup>
import { Field, Form } from "vee-validate";
import { UserForm } from "../../entities/User";
import { confirmPwdSchema } from "../../validation";
import UpdatePassword from "../../graphql/changePwd/ChangePwd.gql";

const isNewPwdVisible = ref(true);
const isConfPwdVisible = ref(true);

const marginBtn = computed(() =>
  useQuasar().screen.gt.md ? "q-mt-xl" : "q-mt-sm"
);

const updatePassword = async (data: UserForm) => {
  try {
    await runMutation(UpdatePassword, { data });
    positiveNotify(t("notifications.success.login"));
    router.push("/login");
  } catch {
    negativeNotify(t("notifications.fail.login"));
  }
};
</script>

<template>
  <span class="titulo q-mb-lg">{{ $t("titles.Login.textPasswordForm") }}</span>
  <Form
    @submit="updatePassword"
    :validation-schema="confirmPwdSchema"
    class="q-gutter-md"
  >
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
          :type="isNewPwdVisible ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              color="white"
              class="cursor-pointer"
              @click="isNewPwdVisible = !isNewPwdVisible"
              :name="isNewPwdVisible ? 'visibility_off' : 'visibility'"
            />
          </template>
        </q-input>
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </div>
    </Field>
    <Field name="confirmPassword" v-slot="item">
      <div>
        <q-input
          :model-value="item.value"
          v-bind="item.field"
          rounded
          standout="bg-info"
          bg-color="primary"
          input-class="text-white"
          class="size text-white"
          :placeholder="$t('label.confirmPwd')"
          :type="isConfPwdVisible ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              color="white"
              class="cursor-pointer"
              @click="isConfPwdVisible = !isConfPwdVisible"
              :name="isConfPwdVisible ? 'visibility_off' : 'visibility'"
            />
          </template>
        </q-input>
        <span v-if="item.errorMessage" class="text-red">
          {{ parseErrorMessage(item.errorMessage) }}
        </span>
      </div>
    </Field>
    <button class="bg-transparent no-padding">
      <q-btn
        :label="$t('action.submit.index')"
        rounded
        :class="marginBtn"
        class="btn-enviar size text-black bg-white"
        size="lg"
      />
    </button>
  </Form>
</template>

<style scoped>
.btn-enviar {
  box-shadow: 0px 10px 40px -12px #fff;
  background: #fff;
  color: black;
}
.btn-enviar:hover {
  box-shadow: 0px 10px 40px -12px #ff0000;
}
.tamanho {
  width: 20rem;
}
</style>
