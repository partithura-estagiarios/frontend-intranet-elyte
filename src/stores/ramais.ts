import { defineStore } from "pinia";
import { Ramal } from "../entities";

function buildRamais(ramais: Ramal[]): { ramais: Ramal[] } {
  loga(ramais);
  return {
    ramais,
  };
}
const Ramais = defineStore("Ramais", {
  state: () => buildRamais(null),
  getters: {
    getRamais: (state) => {
      return state.ramais;
    },
  },
  actions: {
    setRamais(value: Ramal[]) {
      if (value !== null) {
        this.ramais = buildRamais(value).ramais;
      }
      // loga(value)
    },
  },
  persist: true,
});
export const ramaisStorage = Ramais();
