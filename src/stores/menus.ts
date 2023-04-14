import { defineStore } from "pinia";
import { Menu } from "../entities";

const useMenusStorage = defineStore({
  id: "Menus",
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
    getMenus(): Menu {
      return this.menus;
    },
  },
  actions: {
    setMenus(value: Menu) {
      Object.assign(this.menus, value);
    },
  },
  persist: true,
});

export const menusStorage = useMenusStorage();
