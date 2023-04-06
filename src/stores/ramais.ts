import { defineStore } from "pinia";
import { Ramal } from "../entities";

function buildRamais(ramal: Ramal | null): Ramal | null {
  return ramal;
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
      this.ramais = value;
    },
  },
  persist: true,
});

export const ramaisStorage = Ramais();
