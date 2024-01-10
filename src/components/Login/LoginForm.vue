<script lang="ts" setup>
import { isAuthQuery } from "../../entities";
import Auth from "../../graphql/auth/login.gql";
import { Field, Form } from "vee-validate";
import { loginSchema } from "../../validation";
const marginBtn = computed(() =>
  useQuasar().screen.gt.md ? "q-mt-xl" : "q-mt-sm"
);

const isPwdvisible = ref(true);

async function auth(data: Object) {
  try {
    const response = await runMutation(Auth, data);
    if (isAuthQuery(response)) {
      const userStore = userStorage();
      response.auth.user.token = response.auth.token;
      const newResp = response.auth.user;
      userStore.user = newResp;
      console.log(userStore.user);
      positiveNotify(t("notifications.success.login"));
      router.push("/");
    }
  } catch (err) {
    negativeNotify(t("notifications.fail.login"));
  }
}
</script>

<template>
  <span class="q-mb-lg">{{ $t("titles.Login.textLoginForm") }}</span>
  <Form @submit="auth" class="q-gutter-md" :validation-schema="loginSchema">
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
    <q-item class="size" to="/recover">
      <q-item-section clas="row justify-end q-mr-md">
        {{ $t("label.forgetPassword") }}
      </q-item-section>
    </q-item>
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
}
.btn-enviar:hover {
  box-shadow: 0px 10px 40px -12px #ff0000;
}
.size {
  width: 20rem;
}
</style>
