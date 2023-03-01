<template>
  <span class="titulo q-mb-lg">{{ $t("login.textPassword") }}</span>

  <q-form>
    <div>
      <q-input
        rounded
        standout="bg-info"
        bg-color="primary"
        input-class="text-white"
        v-model="form.emailRecover"
        :placeholder="$t('login.labelInputEmail')"
        type="email"
      />
    </div>

    <q-btn
      :label="$t('login.submitButton')"
      rounded
      style="background: #fff; color: black; width: 20rem"
      class="q-mt-md btn-enviar"
      size="lg"
      to="/login/emailEnviado"
    />
  </q-form>

  <q-btn
    class="q-mt-md"
    icon="chevron_left"
    size="16px"
    text-color="primary"
    to="/login"
  >
    <span class="text-white">
      {{ $t("login.backButton") }}
    </span>
  </q-btn>
</template>

<script lang="ts" setup>
const form = ref({
  emailRecover: "",
});
</script>

<style scoped>
.btn-enviar:hover {
  box-shadow: 0 8px 8px -4px red;
  color: red !important;
}
</style>
