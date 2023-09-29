<script setup lang="ts">
import { DateTime } from "luxon";
import * as yup from "yup";
import { Field, Form } from "vee-validate";
import AddMenu from "../../graphql/menu/AddMenu.gql";
import EditMenu from "../../graphql/menu/EditMenu.gql";
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { Ref } from "vue";
import { onMounted, defineEmits } from "vue";

onMounted(() => {
  getMenu();
});

const item: { id?: string } = {};
const menus = ref([]);
const form = reactive({
  date: "",
  salad: "",
  rice: "",
  complement: "",
  soup: "",
  protein: "",
  dessert: "",
});
const showCalendar = ref(false);
const showAddModal = ref(false);
const tableColumns = [
  {
    name: "date",
    required: true,
    label: "Data",
    field: (getMenu: { date: string | number | Date }) =>
      new Date(getMenu.date).toLocaleDateString("pt-BR", {
        weekday: "long",
      }),
    align: "left",
  },
  {
    name: "salad",
    required: true,
    label: "Salada",
    field: "salad",
    align: "left",
  },
  {
    name: "rice",
    required: true,
    label: "Arroz",
    field: "rice",
    align: "left",
  },
  {
    name: "protein",
    required: true,
    label: "Proteína",
    field: "protein",
    align: "left",
  },
  {
    name: "complement",
    required: true,
    label: "Complemento",
    field: "complement",
    align: "left",
  },
  {
    name: "soup",
    required: true,
    label: "Sopa",
    field: "soup",
    align: "left",
  },
  {
    name: "dessert",
    required: true,
    label: "Sobremesa",
    field: "dessert",
    align: "left",
  },
  {
    name: "actions",
    align: "center",
    field: "id",
  },
];
const action: Ref<"add" | "edit" | null> = ref(null);
const opt = {
  edit: () => editMenu(),
  add: () => addMenu(),
};

const schema = yup.object({
  date: makeRuleOfString(),
  salad: makeRuleOfString(),
  rice: makeRuleOfString(),
  protein: makeRuleOfString(),
  complement: makeRuleOfString(),
  soup: makeRuleOfString(),
  dessert: makeRuleOfString(),
});

function makeRuleOfString(message = "warning.requiredField") {
  return yup.string().required(t(message));
}

async function changeMutation() {
  if (action.value !== null) {
    if (validateForm()) {
      opt[action.value]();
    }
  }
  negativeNotify(t("notifications.fail.createMenu"));
}

function validateForm() {
  const requiredFields = [
    "date",
    "salad",
    "rice",
    "protein",
    "complement",
    "soup",
    "dessert",
  ];

  for (const field of requiredFields) {
    if (!form[field]) {
      return false;
    }
  }

  return true;
}

async function getMenu() {
  const { getMenu: rawData } = await runQuery(GetMenu);
  if (Array.isArray(rawData)) {
    rawData.sort((a, b) => a.date - b.date);
    const last7Menus = rawData.slice(0, 7);

    menus.value = last7Menus.map((item: { date: string }) => {
      return {
        ...item,
        date: new Date(parseInt(item.date)),
      };
    });
  }
}

async function editMenu() {
  try {
    const isDuplicateDate = menus.value.some((menu) => menu.date === form.date);

    if (isDuplicateDate) {
      return;
    }
    const response = await runMutation(EditMenu, {
      id: item.id,
      data: form,
    });
    if (response && response.editMenu) {
      positiveNotify(t("notifications.success.editMenu"));
      await getMenu();
      closeAddModal();
      emits("reload");
    }
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}

async function addMenu() {
  try {
    const isDuplicateDate = menus.value.some((menu) => menu.date === form.date);

    if (isDuplicateDate) {
      return;
    }

    const response = await runMutation(AddMenu, { data: form });

    if (response && response.addMenu) {
      positiveNotify(t("notifications.success.createMenu"));
      await getMenu();
      closeAddModal();
      emits("reload");
    }
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}

function redirectToPrintRoute() {
  router.push("menu");
  emits("reload");
}

const emits = defineEmits(["reload", "cancel", "confirm"]);

function openModal(modal: "add" | "edit", id: String) {
  action.value = modal;
  showAddModal.value = true;
  item.id = id;
}

function closeAddModal() {
  showAddModal.value = false;

  action.value = null;
}
</script>
<template>
  <div class="col-6 row justify-center">
    <span class="text-black font text-bold q-ml-xl">
      {{ $t("titles.Hr.Menu") }}
      <q-separator size="0.5rem" color="primary" class="bar-style" />
    </span>
  </div>
  <q-item>
    <q-item-section>
      <div>
        <q-btn
          round
          icon="home"
          color="primary"
          size="1.2rem"
          class="justify-start row q-ml-md"
          @click="router.back"
        />
      </div>
    </q-item-section>

    <q-item-label class="q-item-label justify-end">
      <div>
        <q-btn
          round
          icon="add"
          color="primary"
          size="1.2rem"
          @click="openModal('add')"
        />
        <q-btn
          round
          class="q-ml-xs"
          icon="visibility"
          color="primary"
          size="1.2rem"
          @click="redirectToPrintRoute"
        />
      </div>
    </q-item-label>
  </q-item>
  <div class="full-width">
    <div v-if="menus">
      <table-dynamic
        class="q-pt-md"
        :rows-per-page-options="[10]"
        :grid="$q.screen.xs"
        :rows="menus"
        :columns="tableColumns"
        row-key="id"
      >
        <template #configButtons="props">
          <q-btn
            flat
            size="sm"
            icon="edit"
            @click="openModal('edit', props.item.id)"
          />
        </template>
      </table-dynamic>
    </div>
  </div>
  <DynamicDialog
    v-model="showAddModal"
    @confirm="changeMutation()"
    @cancel="showAddModal = false"
  >
    <q-card class="q-card">
      <q-card-section>
        <Form :validation-schema="schema">
          <Field name="date" v-slot="item">
            <q-input
              v-model="form.date"
              :label="$t('text.day')"
              filled
              @click="showCalendar = true"
            />
            <div style="position: relative">
              <q-date
                v-model="form.date"
                v-if="showCalendar"
                :label="$t('text.day')"
                bg-color="grey-3"
                class="text-black"
                style="position: absolute; top: 100%; left: 0; z-index: 9999"
                @click="showCalendar = false"
              />
            </div>
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
        </Form>
      </q-card-section>
    </q-card>
  </DynamicDialog>
</template>

<style scoped>
.font {
  font-size: 2rem;
}

.bar-style {
  border-radius: 10px;
}
</style>
