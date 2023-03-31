import { defineStore } from "pinia";
import { Ramal } from "../entities";

function buildRamais(ramal: Ramal | null): Ramal | null {
  if (ramal != null) {
    return ramal;
  }
  return null;
}

const Ramais = defineStore("Ramais", {
  state: () => ({
    ramais: buildRamais(null),
  }),
  getters: {
    getRamais: (state) => {
      return state.ramais;
    },
  },
  actions: {
    setRamais(value: Ramal | null) {
      if (value != null) {
        this.ramais = buildRamais(value);
      }
    },
  },
  persist: true,
});

export const ramaisStorage = Ramais();
