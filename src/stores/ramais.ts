import { Ramal } from "../entities";
import { defineStore } from "pinia";

export const useRamaisStorage = defineStore({
  id: "Ramais",
  state: () => {
    return {
      ramais: {
        id: "",
        ramal_user: "",
        ramal_number: "",
        sector_user: "",
      },
    };
  },
  getters: {
    getRamais(): Ramal {
      return this.ramais;
    },
  },
  actions: {
    setRamais(value: Ramal) {
      Object.assign(this.ramais, value);
    },
  },
  persist: true,
});

export const ramaisStorage = useRamaisStorage();
