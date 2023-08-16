import DeleteRamal from "./modais/DeleteRamal.vue";
import EditRamal from "./modais/EditRamal.vue";

export default [
  { label: t("action.delete"), icon: "delete", component: DeleteRamal },
  { label: t("action.edit"), icon: "edit", component: EditRamal },
];
