<script setup lang="ts">
import * as yup from "yup";
import { Form } from "vee-validate";
import AddMenu from "../../graphql/menu/AddMenu.gql";
import EditMenu from "../../graphql/menu/EditMenu.gql";
import GetMenu from "../../graphql/menu/GetMenu.gql";
import { menuSchema } from "../../validation";
import { Menu } from "../../entities";
import { Ref } from "vue";
import { onMounted, defineEmits } from "vue";

onMounted(() => {
  getMenu();
});

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
const tableColumns = [
  {
    name: "date",
    required: true,
    label: t("text.date"),
    field: (getMenu: { date: string | number | Date }) =>
      new Date(getMenu.date).toLocaleDateString("pt-BR", {
        weekday: "long",
      }),
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

async function chooseMutation(data) {
  if (action.value !== null) {
    if (menuSchema) {
      opt[action.value](data);
    }
  }
}

const opt = {
  edit: (data) => editMenu(data),
  add: (data) => addMenu(data),
};

async function getMenu() {
  const { getMenu: rawData } = await runQuery(GetMenu);
  if (Array.isArray(rawData)) {
    rawData.sort((a, b) => a.date - b.date);
    const last7Menus = rawData.slice(0, 7);

    if (Array.isArray(menus.value)) {
      const transformedMenus = [];
      for (const item of last7Menus) {
        const date = new Date(parseInt(item.date));
        transformedMenus.push({ ...item, date });
      }
      menus.value = transformedMenus;
    }
  }
}

async function editMenu(data) {
  data.date = form.date;
  try {
    const isDuplicateDate = menus.value.some((menu) => menu.date === form.date);
    if (isDuplicateDate) {
      return;
    }
    const response = await runMutation(EditMenu, {
      id: item.id,
      data,
    });
    if (response && response.editMenu) {
      positiveNotify(t("notifications.success.editMenu"));
      await getMenu();
      closeAddModal();
      router.go(0);
    }
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}

async function addMenu(data) {
  data.date = form.date;
  try {
    await runMutation(AddMenu, { data });
    positiveNotify("notifications.success.createMenu");
    closeAddModal();
    router.go(0);
  } catch {
    negativeNotify(t("notifications.fail.createMenu"));
  }
}

function redirectToPrintRoute() {
  router.replace("/menu");
  emits("reload");
}

const emits = defineEmits(["reload", "cancel", "confirm"]);

function openModal(modal: "add" | "edit", id?: string) {
  action.value = modal;
  showAddModal.value = true;
  item.id = id;
}

function closeAddModal() {
  showAddModal.value = false;
  action.value = null;
}

function triggerwarning() {
  if (!form.date) {
    negativeNotify(t("warning.dateFieldEmpty"));
  }
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
          class="justify-start row q-ml-xl"
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
    @cancel="showAddModal = false"
    :title="$t('titles.Hr.Menu')"
    class="q-ma-xl"
    hide-controls
  >
    <Form
      :validation-schema="menuSchema"
      class="row q-gutter-sm"
      @submit="chooseMutation"
    >
      <q-input
        v-model="form.date"
        :label="$t('text.day')"
        filled
        @click="showCalendar = true"
        class="col-12"
      />
      <q-date
        flat
        minimal
        v-model="form.date"
        v-if="showCalendar"
        :label="$t('text.day')"
        bg-color="grey-3"
        class="text-black calendar"
        format="DD/MM/YYYY"
        @click="showCalendar = false"
      />
      <StandardInput
        field-name="salad"
        field-color="white"
        class="col-12"
        :field-label="$t('text.menu.salad')"
        borderless
        icon-name="eco"
        icon-class="fit q-px-xs"
        icon-size="md"
        icon-color="primary"
      />

      <StandardInput
        field-name="rice"
        field-color="white"
        class="col-12"
        :field-label="$t('text.menu.rice')"
        borderless
        icon-name="mdi-rice"
        icon-class="fit q-px-xs"
        icon-size="md"
        icon-color="primary"
      />

      <StandardInput
        field-name="protein"
        field-color="white"
        class="col-12"
        :field-label="$t('text.menu.protein')"
        borderless
        icon-name="mdi-food-drumstick"
        icon-class="fit q-px-xs"
        icon-size="md"
        icon-color="primary"
      />

      <StandardInput
        field-name="complement"
        field-color="white"
        class="col-12"
        :field-label="$t('text.menu.complement')"
        borderless
        icon-name="mdi-noodles"
        icon-class="fit q-px-xs"
        icon-size="md"
        icon-color="primary"
      />

      <StandardInput
        field-name="soup"
        field-color="white"
        class="col-12"
        :field-label="$t('text.menu.soup')"
        borderless
        icon-name="soup_kitchen"
        icon-class="fit q-px-xs"
        icon-size="md"
        icon-color="primary"
      />

      <StandardInput
        field-name="dessert"
        field-color="white"
        class="col-12"
        :field-label="$t('text.menu.dessert')"
        borderless
        icon-name="mdi-ice-cream"
        icon-class="fit q-px-xs"
        icon-size="md"
        icon-color="primary"
      />
      <Button class="bg-transparent no-padding">
        <q-btn
          flat
          :label="$t('action.confirm.index')"
          color="primary"
          @click="triggerwarning"
        />
      </Button>
    </Form>
  </DynamicDialog>
</template>

<style scoped>
.font {
  font-size: 2rem;
}
.btn {
  display: flex;
  justify-content: flex-end;
}

.calendar {
  justify-content: center;
  display: flex;
  position: absolute;
  z-index: 9999;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 60px;
}
</style>
