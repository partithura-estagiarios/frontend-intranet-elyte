import AddSystemDialog from "../DynamicDialog/SystemModals/AddSystemDialog.vue";
import DelSystemDialog from "../DynamicDialog/SystemModals/DelSystemDialog.vue";
import EditSystemDialog from "../DynamicDialog/SystemModals/EditSystemDialog.vue";
import { Action } from "../../entities/Action";

export default [
  { label: t("action.add"), icon: "add", component: AddSystemDialog },
  { label: t("action.edit"), icon: "edit", component: EditSystemDialog },
  { label: t("action.delete"), icon: "delete", component: DelSystemDialog },
] as Action[];
