import { defineStore } from "pinia";
import { Menu } from "../entities";

const Menus = defineStore("Menus", {
  state: () => {
    return {
      menus: {
        id: "",
        complement: "",
        dessert: "",
        protein: "",
        salad: "",
        rice: "",
        soup: "",
        week: "",
        day: "",
        createdAt: "",
        updatedAt: "",
      },
    };
  },
  getters: {
    getMenus: (state) => {
      return state.menus;
    },
  },
  actions: {
    setMenus(value: Menu[]) {
      Object.assign(this.$state, value);
    },
  },
  persist: true,
});
export const menusStorage = Menus();
