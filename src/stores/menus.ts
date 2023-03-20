import { defineStore } from "pinia";
import { Menu } from "../entities";

function buildMenus(menus: Menu[]): { menus: Menu[] } {
  return {
    menus,
  };
}

const Menus = defineStore("Menus", {
  state: () => buildMenus(null),
  getters: {
    getMenus: (state) => {
      return state.menus;
    },
  },
  actions: {
    setMenus(value: Menu[]) {
      if (value !== null) {
        this.menus = buildMenus(value).menus;
      }
    },
  },
  persist: true,
});
export const menusStorage = Menus();
