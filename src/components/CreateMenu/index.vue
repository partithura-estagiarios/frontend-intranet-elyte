<script setup lang="ts">
import * as yup from "yup";
import { Field, Form } from "vee-validate";
import AddMenu from "../../graphql/menu/AddMenu.gql";
import EditMenu from "../../graphql/menu/EditMenu.gql";
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { Menu } from "../../entities";
import { Ref } from "vue";
import { onMounted, defineEmits } from "vue";
import { QTableColumn } from "quasar";

onMounted(() => {
  getMenu();
  refreshPagination();
});

const props = defineProps({
  rowsPerPage: {
    type: Number,
    default: 0,
  },
  pagination: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["reload", "cancel", "confirm", "update:pagination"]);
const currentPage = ref(0);
const max = ref(0);
const pages = ref(0);
const total = ref(0);
const paginationFilter = ref({ page: 0, limit: 6 });
const paginationData = ref({});
const item: { id?: string } = {};
const menus: Ref<Menu[]> = ref([]);
const form: Omit<Menu, "id"> = reactive({
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
const tableColumns: Ref<QTableColumn[]> = [
  {
    name: "date",
    required: true,
    label: t("text.date"),
    field: "dayOfWeek",
    align: "left",
  },

  {
    name: "salad",
    required: true,
    label: t("text.menu.salad"),
    field: "salad",
    align: "left",
  },
  {
    name: "rice",
    required: true,
    label: t("text.menu.rice"),
    field: "rice",
    align: "left",
  },
  {
    name: "protein",
    required: true,
    label: t("text.menu.protein"),
    field: "protein",
    align: "left",
  },
  {
    name: "complement",
    required: true,
    label: t("text.menu.complement"),
    field: "complement",
    align: "left",
  },
  {
    name: "soup",
    required: true,
    label: t("text.menu.soup"),
    field: "soup",
    align: "left",
  },
  {
    name: "dessert",
    required: true,
    label: t("text.menu.dessert"),
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
const { pagination } = toRefs(props);
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

function calculatePages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}

function refreshPagination(): void {
  if (props.pagination && props.pagination.currentPage !== undefined) {
    currentPage.value = props.pagination.currentPage + 1;
    max.value = props.pagination.limit || 0;
    total.value = props.pagination.total || 0;
    pages.value = calculatePages(total.value, max.value);
    console.log({ currentPage });
  }
}

function updatePage(): void {
  emit("update:pagination", {
    page: currentPage.value,
    limit: max.value,
  });
}

async function changeMutation() {
  if (action.value !== null) {
    if (validateForm()) {
      opt[action.value]();
    }
  }
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
  try {
    const response = await runQuery(GetMenu, {
      pagination: { ...paginationFilter.value },
    });

    if (response && response.getMenu) {
      const menuItems = response.getMenu.nodes.map((menu: Menu) => ({
        ...menu,
        dayOfWeek: getDayOfWeek(menu.date),
      }));

      menus.value = menuItems;
      paginationData.value = response.getMenu.pagination;

      console.log(paginationData);
    }
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
}
function applyPagination(pagination: any): void {
  paginationFilter.value = { ...pagination };
  getMenu();
}
function getDayOfWeek(timestamp: string) {
  if (timestamp) {
    const daysOfWeek = [
      t("text.days.monday"),
      t("text.days.tuesday"),
      t("text.days.wednesday"),
      t("text.days.thursday"),
      t("text.days.friday"),
      t("text.days.saturday"),
    ];
    const date = new Date(parseInt(timestamp));
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }
  return "";
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
      emit("reload");
    }
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}

async function addMenu() {
  try {
    await runMutation(AddMenu, { data: form });
    positiveNotify("notifications.success.createMenu");
    closeAddModal();
    emit("reload");
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}

function redirectToPrintRoute() {
  router.replace("/menu");
  emit("reload");
}

function openModal(modal: "add" | "edit", id?: string) {
  action.value = modal;
  showAddModal.value = true;
  item.id = id;
}

function closeAddModal() {
  showAddModal.value = false;

  action.value = null;
}

watch(
  pagination,
  (newVal, oldVal) => {
    console.log("Pagination changed", newVal, oldVal);
    refreshPagination();
  },
  { deep: true }
);
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
      <SimpleTable
        :rows="menus"
        :columns="tableColumns"
        is-flat
        :pagination="paginationData"
        dynamic-pagination
        @update:pagination="applyPagination"
      >
        <template #configButtons="props">
          <q-btn
            flat
            size="sm"
            icon="edit"
            @click="openModal('edit', props.item.id)"
          />
        </template>
        <template #bottom>
          <div class="full-width row justify-end">
            <q-pagination
              color="grey"
              v-model="currentPage"
              :max="pages"
              input
              @update:model-value="updatePage"
            />
            <tr v-if="$slots['append']">
              <td :colspan="columns.length" class="cell">
                <slot name="append" />
              </td>
            </tr>
          </div>
        </template>
      </SimpleTable>
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
                class="text-black calendar"
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
.calendar {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 9999;
}
</style>
