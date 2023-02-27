import { defineStore } from "pinia";
import { Ramal } from "../entities";

function buildRamal(ramal: Ramal): Ramal {
  if (ramal != null) {
    return ramal;
  }
  return null;
}

const Ramal = defineStore("Ramal", {
  state: () => ({
    ramal: buildRamal(null),
  }),
  getters: {
    getId: (state) => {
      return state.ramal?.id;
    },
    getName: (state) => {
      return state.ramal?.ramal_user;
    },
    getNumber: (state) => {
      return state.ramal?.ramal_number;
    },
    getSector: (state) => {
      return state.ramal?.sector_user;
    },
    getRamal: (state) => {
      return state.ramal;
    },
  },
  actions: {
    setRamal(value: Ramal) {
      this.ramal = buildRamal(value);
    },
  },
  persist: true,
});
export const ramalStorage = Ramal();
